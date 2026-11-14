import { memo, useCallback, type ReactElement, type SubmitEvent } from 'react';
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

    const localLoginRequest = useLocalLogin();
    const isLocalLoginPending = localLoginRequest.isPending;

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

        if (isLocalLoginPending) {
            return;
        }

        localLoginRequest.reset();

        form.handleSubmit((data) => {
            localLoginRequest
                .mutateAsync({ data })
                .then(() => form.reset())
                .then(() => localLoginRequest.reset())
                .then(() => navigate('/'))
                .catch((error: unknown) => {
                    if (isAxiosError(error) && error.response?.status === 422) {
                        form.reset();
                        localLoginRequest.reset();

                        navigate('/authentication/local-account-initiation');
                    }
                });
        })();
    };

    const onGoogleLoginClick = useCallback(() => {
        form.reset();
        localLoginRequest.reset();

        window.location.href = getGoogleLoginLink();
    }, [localLoginRequest, form]);

    const onSignupClick = () => {
        form.reset();
        localLoginRequest.reset();

        navigate('/authentication/signup-initiation');
    };

    const localLoginErrorMessage = getApiErrorMessage(localLoginRequest.error);

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
                            const errorMessage = formState.errors.email?.message;

                            return (
                                <div className="flex flex-col gap-1">
                                    <Input
                                        placeholder="email"
                                        name="email"
                                        onChange={isLocalLoginPending ? () => {} : field.onChange}
                                        value={field.value}
                                        disabled={isLocalLoginPending}
                                    />
                                    {errorMessage && (
                                        <Typography variant="caption" className="text-error">
                                            {errorMessage as string}
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
                            const errorMessage = formState.errors.password?.message;

                            return (
                                <div className="flex flex-col gap-1">
                                    <Input
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                        onChange={isLocalLoginPending ? () => {} : field.onChange}
                                        value={field.value}
                                        disabled={isLocalLoginPending}
                                    />
                                    {errorMessage && (
                                        <Typography variant="caption" className="text-error">
                                            {errorMessage as string}
                                        </Typography>
                                    )}
                                </div>
                            );
                        }}
                    />
                    <Button fullWidth type="submit" disabled={isLocalLoginPending}>
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

export default memo(Content);
