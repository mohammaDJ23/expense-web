import { memo, useCallback, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useGoogle } from '@/api/orval/generated/endpoints/authentication';
import {
    signupInitiationSchema,
    type TSignupInitiationSchema,
} from '@/features/authentication/signup-initiation/schemas/signupInitiationSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';

function Content(): ReactElement {
    const navigate = useNavigate();

    const googleRequest = useGoogle({
        query: {
            enabled: false,
        },
    });

    const form = useForm<TSignupInitiationSchema>({
        resolver: zodResolver(signupInitiationSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.handleSubmit((data) => {
            console.log(data);
        })();
    };

    const onGoogleLoginClick = useCallback(() => {
        googleRequest.refetch();
    }, [googleRequest]);

    const onSigninClick = () => {
        navigate('/authentication/login');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <p className="heading-3 text-center">Create Your Account</p>
                    <p className="caption text-center">Enter your email address to get started</p>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-5">
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
                                        onChange={field.onChange}
                                        value={field.value}
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
                    <Button fullWidth type="submit">
                        Continue
                    </Button>
                </form>
            </div>
            <div className="flex items-center gap-3">
                <hr className="border-surface-secondary border  w-100" />
                <p className="text-body">or</p>
                <hr className="border-surface-secondary border w-100" />
            </div>
            <div className="flex flex-col gap-5">
                <Button fullWidth onClick={onGoogleLoginClick} variant="secondary">
                    Continue with Google
                </Button>
                <p className="text-body text-center">
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
