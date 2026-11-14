import { memo, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLocalForgotPassword } from '@/api/orval/generated/endpoints/authentication';
import {
    forgotPasswordSchema,
    type TForgotPasswordSchema,
} from '@/features/authentication/forgot-password/schemas/forgotPasswordSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const localForgotPasswordRequest = useLocalForgotPassword();
    const isLocalForgotPasswordPending = localForgotPasswordRequest.isPending;

    const form = useForm<TForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLocalForgotPasswordPending) {
            return;
        }

        localForgotPasswordRequest.reset();

        form.handleSubmit((data) => {
            localForgotPasswordRequest.mutateAsync({ data }).then(() => form.reset());
        })();
    };

    const onSigninClick = () => {
        form.reset();
        localForgotPasswordRequest.reset();

        navigate('/authentication/login');
    };

    const localForgotPasswordSuccessMessage = localForgotPasswordRequest.data?.data?.message;
    const localForgotPasswordErrorMessage = getApiErrorMessage(localForgotPasswordRequest.error);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <p className="heading-3 text-center">Forgot Password</p>
                    <p className="caption text-center">
                        Enter your email address to receive password reset instructions
                    </p>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, formState }) => {
                            const errorMessage = formState.errors.email?.message;

                            return (
                                <div className="flex flex-col gap-1">
                                    <Input
                                        placeholder="email"
                                        name="email"
                                        onChange={
                                            isLocalForgotPasswordPending ? () => {} : field.onChange
                                        }
                                        value={field.value}
                                        disabled={isLocalForgotPasswordPending}
                                    />
                                    {errorMessage && (
                                        <p className="caption text-error">
                                            {errorMessage as string}
                                        </p>
                                    )}
                                </div>
                            );
                        }}
                    />
                    <Button fullWidth type="submit" disabled={isLocalForgotPasswordPending}>
                        Send Reset Link
                    </Button>
                    <Message message={localForgotPasswordErrorMessage} variant="error" />
                    <Message message={localForgotPasswordSuccessMessage} variant="success" />
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
