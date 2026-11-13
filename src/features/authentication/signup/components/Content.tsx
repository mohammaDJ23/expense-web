import { memo, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate, useSearchParams } from 'react-router';

import { useLocalSignup } from '@/api/orval/generated/endpoints/authentication';
import {
    signupSchema,
    type TSignupSchema,
} from '@/features/authentication/signup/schemas/signupSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const localSignupRequest = useLocalSignup();
    const isLocalSignupPending = localSignupRequest.isPending;

    const token = searchParams.get('token');

    const form = useForm<TSignupSchema>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
        defaultValues: {
            password: '',
            token: token || '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLocalSignupPending) {
            return;
        }

        localSignupRequest.reset();

        form.handleSubmit((data) => {
            localSignupRequest
                .mutateAsync({ data })
                .then(() => form.reset())
                .then(() => localSignupRequest.reset())
                .then(() => navigate('/authentication/login'));
        })();
    };

    const onSigninClick = () => {
        form.reset();
        localSignupRequest.reset();

        navigate('/authentication/login');
    };

    if (!token) {
        return <Navigate to="/authentication/signup-initiation" />;
    }

    const localSignupErrorMessage = getApiErrorMessage(localSignupRequest.error);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <p className="heading-3 text-center">Create Your Account</p>
                    <p className="caption text-center">Set a password to complete signup</p>
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
                                        <p className="caption text-error">
                                            {errorMessage as string}
                                        </p>
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
                                        onChange={isLocalSignupPending ? () => {} : field.onChange}
                                        value={field.value}
                                        disabled={isLocalSignupPending}
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
                    <Button fullWidth type="submit" disabled={isLocalSignupPending}>
                        Sign Up
                    </Button>
                    <Message message={localSignupErrorMessage} variant="error" />
                </form>
            </div>
            <p className="text-body text-center text-text-muted">
                Already have an account?{' '}
                <span className="text-primary cursor-pointer" onClick={onSigninClick}>
                    Sign in
                </span>
            </p>
        </div>
    );
}

export default memo(Content);
