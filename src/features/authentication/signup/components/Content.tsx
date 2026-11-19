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
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const request = useLocalSignup();
    const isPending = request.isPending;

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

        if (isPending) {
            return;
        }

        request.reset();

        form.handleSubmit((data) => {
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
        return <Navigate to="/authentication/signup-initiation" />;
    }

    const localSignupErrorMessage = getApiErrorMessage(request.error);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <Typography variant="heading-3" className="text-center">
                        Create Your Account
                    </Typography>
                    <Typography variant="caption" className="text-center">
                        Set a password to complete signup
                    </Typography>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Controller
                        name="token"
                        control={form.control}
                        render={({ formState }) => {
                            const errorMessage = formState.errors?.token?.message;
                            const value = Array.from({
                                length: Math.min(token.length, 60),
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
                        Sign Up
                    </Button>
                    <Message message={localSignupErrorMessage} variant="error" />
                </form>
            </div>
            <Typography className="text-center text-text-muted">
                Already have an account?{' '}
                <Typography
                    as="span"
                    className="text-primary cursor-pointer inline-block"
                    onClick={onSigninClick}
                >
                    Sign in
                </Typography>
            </Typography>
        </div>
    );
}

export default memo(Content);
