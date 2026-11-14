import { memo, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate, useSearchParams } from 'react-router';

import { useLocalResetPassword } from '@/api/orval/generated/endpoints/authentication';
import {
    resetPasswordSchema,
    type TResetPasswordSchema,
} from '@/features/authentication/reset-password/schemas/resetPasswordSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const localResetPasswordRequest = useLocalResetPassword();
    const isLocalResetPasswordPending = localResetPasswordRequest.isPending;

    const token = searchParams.get('token');

    const form = useForm<TResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onChange',
        defaultValues: {
            newPassword: '',
            token: token || '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLocalResetPasswordPending) {
            return;
        }

        localResetPasswordRequest.reset();

        form.handleSubmit((data) => {
            localResetPasswordRequest
                .mutateAsync({ data })
                .then(() => form.reset())
                .then(() => localResetPasswordRequest.reset())
                .then(() => navigate('/authentication/login'));
        })();
    };

    const onSigninClick = () => {
        form.reset();
        localResetPasswordRequest.reset();

        navigate('/authentication/login');
    };

    if (!token) {
        return <Navigate to="/authentication/login" />;
    }

    const localSignupErrorMessage = getApiErrorMessage(localResetPasswordRequest.error);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <p className="heading-3 text-center">Reset Password</p>
                    <p className="caption text-center">Enter your new password</p>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Controller
                        name="token"
                        control={form.control}
                        render={({ formState }) => {
                            const errorMessage = formState.errors.token?.message;
                            const value = Array.from({
                                length: Math.min(token?.length ?? 0, 60),
                            })
                                .fill('*')
                                .join('');

                            return (
                                <div className="flex flex-col gap-1">
                                    <Input
                                        placeholder="token"
                                        name="token"
                                        value={value}
                                        disabled={true}
                                    />
                                    {errorMessage && (
                                        <p className="caption text-error">{errorMessage}</p>
                                    )}
                                </div>
                            );
                        }}
                    />
                    <Controller
                        name="newPassword"
                        control={form.control}
                        render={({ field, formState }) => {
                            const errorMessage = formState.errors.newPassword?.message;

                            return (
                                <div className="flex flex-col gap-1">
                                    <Input
                                        type="password"
                                        placeholder="new password"
                                        name="newPassword"
                                        onChange={
                                            isLocalResetPasswordPending ? () => {} : field.onChange
                                        }
                                        value={field.value}
                                        disabled={isLocalResetPasswordPending}
                                    />
                                    {errorMessage && (
                                        <p className="caption text-error">{errorMessage}</p>
                                    )}
                                </div>
                            );
                        }}
                    />
                    <Button fullWidth type="submit" disabled={isLocalResetPasswordPending}>
                        Reset Password
                    </Button>
                    <Message message={localSignupErrorMessage} variant="error" />
                </form>
            </div>
            <p
                onClick={onSigninClick}
                className="text-body text-center text-primary cursor-pointer"
            >
                Back to Sign in
            </p>
        </div>
    );
}

export default memo(Content);
