import { memo, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLocalAccountInitiation } from '@/api/orval/generated/endpoints/authentication';
import {
    localAccountInitiationSchema,
    type TLocalAccountInitiationSchema,
} from '@/features/authentication/local-account-initiation/schemas/localAccountInitiationSchema';
import Button from '@/features/shared/components/atoms/Button';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const localAccountInitiationRequest = useLocalAccountInitiation();
    const isLocalAccountInitiationPending = localAccountInitiationRequest.isPending;

    const form = useForm<TLocalAccountInitiationSchema>({
        resolver: zodResolver(localAccountInitiationSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLocalAccountInitiationPending) {
            return;
        }

        localAccountInitiationRequest.reset();

        form.handleSubmit((data) => {
            localAccountInitiationRequest.mutateAsync({ data }).then(() => form.reset());
        })();
    };

    const onSigninClick = () => {
        form.reset();
        localAccountInitiationRequest.reset();

        navigate('/authentication/login');
    };

    const localAccountInitiationSuccessMessage = localAccountInitiationRequest.data?.data?.message;
    const localAccountInitiationErrorMessage = getApiErrorMessage(
        localAccountInitiationRequest.error,
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                    <Typography variant="heading-3" className="text-center">
                        Create Your Local Account
                    </Typography>
                    <Typography variant="caption" className=" text-center">
                        You already have none local account. Let's create a local account for you.
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
                                        onChange={
                                            isLocalAccountInitiationPending
                                                ? () => {}
                                                : field.onChange
                                        }
                                        value={field.value}
                                        disabled={isLocalAccountInitiationPending}
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
                    <Button fullWidth type="submit" disabled={isLocalAccountInitiationPending}>
                        Continue
                    </Button>
                    <Message message={localAccountInitiationErrorMessage} variant="error" />
                    <Message message={localAccountInitiationSuccessMessage} variant="success" />
                </form>
            </div>
            <Typography onClick={onSigninClick} className="text-center text-primary cursor-pointer">
                Back to Sign in
            </Typography>
        </div>
    );
}

export default memo(Content);
