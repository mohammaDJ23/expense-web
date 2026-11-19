import { memo, useCallback, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLocalSignupInitiation } from '@/api/orval/generated/endpoints/authentication';
import {
    signupInitiationSchema,
    type TSignupInitiationSchema,
} from '@/features/authentication/signup-initiation/schemas/signupInitiationSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';
import { getGoogleLoginLink } from '@/features/shared/utils/getGoogleLoginLink';

function Content(): ReactElement {
    const navigate = useNavigate();

    const request = useLocalSignupInitiation();
    const isPending = request.isPending;

    const form = useForm<TSignupInitiationSchema>({
        resolver: zodResolver(signupInitiationSchema),
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
            request.mutateAsync({ data }).then(() => {
                form.reset();
            });
        })();
    };

    const onGoogleLoginClick = useCallback(() => {
        form.reset();
        request.reset();

        window.location.href = getGoogleLoginLink();
    }, [request, form]);

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
                    <Typography variant="heading-3" className="text-center">
                        Create Your Account
                    </Typography>
                    <Typography variant="caption" className="text-center">
                        Enter your email address to get started
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
                        Continue
                    </Button>
                    <Message message={errorMessage} variant="error" />
                    <Message message={successMessage} variant="success" />
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
        </div>
    );
}

export default memo(Content);
