import { useCallback, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLocalLogin } from '@/api/orval/generated/endpoints/authentication';
import {
    loginSchema,
    type TLoginSchema,
} from '@/features/authentication/login/schemas/loginSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';
import { getGoogleLoginLink } from '@/features/shared/utils/getGoogleLoginLink';

function Content(): ReactElement {
    const navigate = useNavigate();

    const request = useLocalLogin();
    const isPending = request.isPending;

    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isPending) {
            return;
        }

        request.reset();

        form.handleSubmit((data) => {
            request
                .mutateAsync({ data })
                .then(() => form.reset())
                .then(() => request.reset())
                .then(() => navigate('/'))
                .catch((error: unknown) => {
                    if (isAxiosError(error) && error.response?.status === 422) {
                        form.reset();
                        request.reset();

                        navigate('/authentication/local-account-initiation');
                    }
                });
        })();
    };

    const onGoogleLoginClick = useCallback(() => {
        form.reset();
        request.reset();

        window.location.href = getGoogleLoginLink();
    }, [request, form]);

    const onSignupClick = () => {
        form.reset();
        request.reset();

        navigate('/authentication/signup-initiation');
    };

    const localLoginErrorMessage = getApiErrorMessage(request.error);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <Typography variant="heading-3" className="text-center">
                        Welcome Back
                    </Typography>
                    <Typography variant="caption" className="text-center">
                        Sign in to your account
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
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, formState }) => {
                            const errorMessage = formState.errors?.password?.message;

                            return (
                                <div className="flex flex-col gap-1">
                                    <Input
                                        type="password"
                                        placeholder="password"
                                        name="password"
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
                        Sign In
                    </Button>
                    <Message message={localLoginErrorMessage} variant="error" />
                </form>
            </div>
            <div className="flex items-center gap-4">
                <hr className="border-surface-secondary border  w-100" />
                <Typography>or</Typography>
                <hr className="border-surface-secondary border w-100" />
            </div>
            <div className="flex flex-col gap-4">
                <Button fullWidth onClick={onGoogleLoginClick} variant="secondary">
                    Continue with Google
                </Button>
                <Typography className="text-center text-text-muted">
                    Don't have an account?{' '}
                    <Typography
                        className="text-primary cursor-pointer inline-block"
                        onClick={onSignupClick}
                    >
                        Sign up
                    </Typography>
                </Typography>
            </div>
        </div>
    );
}

export default Content;
