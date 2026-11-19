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
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const request = useLocalForgotPassword();
    const isPending = request.isPending;

    const form = useForm<TForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isPending) {
            return;
        }

        request.reset();

        form.handleSubmit((data) => {
            request.mutateAsync({ data }).then(() => form.reset());
        })();
    };

    const onSigninClick = () => {
        form.reset();
        request.reset();

        navigate('/authentication/login');
    };

    const successMessage = request.data?.data?.message;
    const errorMessage = getApiErrorMessage(request.error);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <Typography variant="heading-3" className=" text-center">
                        Forgot Password
                    </Typography>
                    <Typography variant="caption" className="text-center">
                        Enter your email address to receive password reset instructions
                    </Typography>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, formState }) => {
                            const errorMessage = formState.errors?.email?.message;

                            return (
                                <div className="flex flex-col gap-1">
                                    <Input
                                        placeholder="email"
                                        name="email"
                                        onChange={isPending ? () => {} : field.onChange}
                                        value={field.value}
                                        disabled={isPending}
                                    />
                                    {errorMessage && (
                                        <Typography variant="caption" className="text-error">
                                            {errorMessage}
                                        </Typography>
                                    )}
                                </div>
                            );
                        }}
                    />
                    <Button fullWidth type="submit" disabled={isPending}>
                        Send Reset Link
                    </Button>
                    <Message message={errorMessage} variant="error" />
                    <Message message={successMessage} variant="success" />
                </form>
            </div>
            <Typography onClick={onSigninClick} className="text-center text-primary cursor-pointer">
                Back to Sign in
            </Typography>
        </div>
    );
}

export default memo(Content);
