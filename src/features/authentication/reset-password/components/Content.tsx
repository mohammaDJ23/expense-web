import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useSearchParams } from 'react-router';

import { useLocalResetPassword } from '@/api/orval/generated/endpoints/authentication';
import {
    resetPasswordSchema,
    type TResetPasswordSchema,
} from '@/features/authentication/reset-password/schemas/resetPasswordSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import Typography from '@/features/shared/components/atoms/Typography';
import FormController from '@/features/shared/components/molecules/FormController';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

import type { ReactElement, SubmitEvent } from 'react';

function Content(): ReactElement {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const request = useLocalResetPassword();
    const isPending = request.isPending;

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

        if (isPending) {
            return;
        }

        form.handleSubmit((data) => {
            request.reset();

            request
                .mutateAsync({ data })
                .then(() => form.reset())
                .then(() => request.reset())
                .then(() => navigate('/authentication/login'));
        })();
    };

    const onSigninClick = () => {
        form.reset();
        request.reset();

        navigate('/authentication/login');
    };

    if (!token) {
        return <Navigate to="/authentication/login" />;
    }

    const localResetPasswordErrorMessage = getApiErrorMessage(request.error);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <Typography variant="heading-3" className="text-center">
                        Reset Password
                    </Typography>
                    <Typography variant="caption" className="text-center">
                        Enter your new password
                    </Typography>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <FormController
                        name="token"
                        control={form.control}
                        render={() => {
                            const value = Array.from({
                                length: Math.min(token.length, 60),
                            })
                                .fill('*')
                                .join('');

                            return (
                                <Input
                                    placeholder="token"
                                    name="token"
                                    value={value}
                                    disabled={true}
                                />
                            );
                        }}
                    />
                    <FormController
                        name="newPassword"
                        control={form.control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                placeholder="new password"
                                name="newPassword"
                                onChange={isPending ? () => {} : field.onChange}
                                value={field.value}
                                disabled={isPending}
                            />
                        )}
                    />
                    <Button fullWidth type="submit" disabled={isPending}>
                        Reset Password
                    </Button>
                    <Message message={localResetPasswordErrorMessage} variant="error" />
                </form>
            </div>
            <Typography onClick={onSigninClick} className="text-center text-primary cursor-pointer">
                Back to Sign in
            </Typography>
        </div>
    );
}

export default Content;
