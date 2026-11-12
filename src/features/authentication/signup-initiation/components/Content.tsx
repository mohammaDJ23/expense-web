import { memo, useCallback, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
    getGoogleQueryKey,
    useGoogle,
    useLocalSignupInitiation,
} from '@/api/orval/generated/endpoints/authentication';
import {
    signupInitiationSchema,
    type TSignupInitiationSchema,
} from '@/features/authentication/signup-initiation/schemas/signupInitiationSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const googleRequest = useGoogle({
        query: {
            enabled: false,
        },
    });
    const isGoogleFetching = googleRequest.isFetching;

    const localSignupInitiationRequest = useLocalSignupInitiation();
    const isLocalSignupInitiationPending = localSignupInitiationRequest.isPending;

    const form = useForm<TSignupInitiationSchema>({
        resolver: zodResolver(signupInitiationSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
        },
    });

    const resetApis = useCallback(() => {
        localSignupInitiationRequest.reset();

        return queryClient.resetQueries({
            queryKey: getGoogleQueryKey(),
        });
    }, [queryClient, localSignupInitiationRequest]);

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLocalSignupInitiationPending) {
            return;
        }

        resetApis().then(() => {
            form.handleSubmit((data) => {
                localSignupInitiationRequest.mutateAsync({ data });
            })();
        });
    };

    const onGoogleLoginClick = useCallback(() => {
        if (isGoogleFetching) {
            return;
        }

        resetApis().then(() => {
            googleRequest.refetch();
        });
    }, [googleRequest, isGoogleFetching, resetApis]);

    const onSigninClick = () => {
        navigate('/authentication/login');
    };

    const localSignupInitiationSuccessMessage = localSignupInitiationRequest.data?.data?.message;
    const googleErrorMessage = getApiErrorMessage(googleRequest.error);
    const localSignupInitiationErrorMessage = getApiErrorMessage(
        localSignupInitiationRequest.error,
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <p className="heading-3 text-center">Create Your Account</p>
                    <p className="caption text-center">Enter your email address to get started</p>
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
                                            isLocalSignupInitiationPending
                                                ? () => {}
                                                : field.onChange
                                        }
                                        value={field.value}
                                        disabled={isLocalSignupInitiationPending}
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
                    <Button fullWidth type="submit" disabled={isLocalSignupInitiationPending}>
                        Continue
                    </Button>
                    <Message message={localSignupInitiationErrorMessage} variant="error" />
                    <Message message={localSignupInitiationSuccessMessage} variant="success" />
                </form>
            </div>
            <div className="flex items-center gap-4">
                <hr className="border-surface-secondary border  w-100" />
                <p className="text-body">or</p>
                <hr className="border-surface-secondary border w-100" />
            </div>
            <div className="flex flex-col gap-4">
                <Button
                    fullWidth
                    onClick={onGoogleLoginClick}
                    disabled={isGoogleFetching}
                    variant="secondary"
                >
                    Continue with Google
                </Button>
                <Message message={googleErrorMessage} variant="error" />
                <p className="text-body text-center text-text-muted">
                    Already have an account?{' '}
                    <span className="text-primary cursor-pointer" onClick={onSigninClick}>
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}

export default memo(Content);
