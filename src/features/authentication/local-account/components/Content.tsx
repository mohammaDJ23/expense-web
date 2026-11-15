import { memo, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate, useSearchParams } from 'react-router';

import { useLocalAccountCreation } from '@/api/orval/generated/endpoints/authentication';
import {
    localAccountSchema,
    type TLocalAccountSchema,
} from '@/features/authentication/local-account/schemas/localAccountSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const localAccountRequest = useLocalAccountCreation();
    const isLocalAccountPending = localAccountRequest.isPending;

    const token = searchParams.get('token');

    const form = useForm<TLocalAccountSchema>({
        resolver: zodResolver(localAccountSchema),
        mode: 'onChange',
        defaultValues: {
            password: '',
            token: token || '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLocalAccountPending) {
            return;
        }

        localAccountRequest.reset();

        form.handleSubmit((data) => {
            localAccountRequest
                .mutateAsync({ data })
                .then(() => form.reset())
                .then(() => localAccountRequest.reset())
                .then(() => navigate('/authentication/login'));
        })();
    };

    const onSigninClick = () => {
        form.reset();
        localAccountRequest.reset();

        navigate('/authentication/login');
    };

    if (!token) {
        return <Navigate to="/authentication/login" />;
    }

    const localAccountErrorMessage = getApiErrorMessage(localAccountRequest.error);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <Typography variant="heading-3" className="text-center">
                        Create Your Local Account
                    </Typography>
                    <Typography variant="caption" className=" text-center">
                        Set a password to complete the creation of a local account
                    </Typography>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Controller
                        name="token"
                        control={form.control}
                        render={({ formState }) => {
                            const errorMessage = formState.errors.token?.message;
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
                            const errorMessage = formState.errors.password?.message;

                            return (
                                <div className="flex flex-col gap-1">
                                    <Input
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                        onChange={isLocalAccountPending ? () => {} : field.onChange}
                                        value={field.value}
                                        disabled={isLocalAccountPending}
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
                    <Button fullWidth type="submit" disabled={isLocalAccountPending}>
                        Create
                    </Button>
                    <Message message={localAccountErrorMessage} variant="error" />
                </form>
            </div>
            <Typography onClick={onSigninClick} className="text-center text-primary cursor-pointer">
                Back to Sign in
            </Typography>
        </div>
    );
}

export default memo(Content);
