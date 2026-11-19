import { useCallback, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
    getFindLocationListQueryKey,
    getFindTotalLocationsQueryKey,
    getSearchLocationsQueryKey,
    useCreateLocation,
} from '@/api/orval/generated/endpoints/location';
import {
    createLocationSchema,
    type TCreateLocationSchema,
} from '@/features/location/create/schemas/createLocationSchema';
import Button from '@/features/shared/components/atoms/Button';
import Card from '@/features/shared/components/atoms/Card';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const request = useCreateLocation();
    const isPending = request.isPending;

    const form = useForm<TCreateLocationSchema>({
        resolver: zodResolver(createLocationSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isPending) {
            return;
        }

        form.handleSubmit((data) => {
            request.reset();

            request
                .mutateAsync({ data })
                .then(() => form.reset())
                .then(() =>
                    queryClient.invalidateQueries({
                        queryKey: getFindLocationListQueryKey(),
                    }),
                )
                .then(() =>
                    queryClient.invalidateQueries({
                        queryKey: getFindTotalLocationsQueryKey(),
                    }),
                )
                .then(() =>
                    queryClient.invalidateQueries({
                        queryKey: getSearchLocationsQueryKey(),
                    }),
                );
        })();
    };

    const id = request.data?.data?.data?.id;

    const onSeeLocationClick = useCallback(() => {
        if (id) {
            navigate(`/locations/${id}`);
        }
    }, [id, navigate]);

    const successMessage = request.data?.data?.message;
    const errorMessage = getApiErrorMessage(request.error);

    return (
        <Card className="h-max">
            <form onSubmit={onSubmit} className="flex flex-col gap-4 overflow-hidden">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, formState }) => {
                        const errorMessage = formState.errors?.name?.message;

                        return (
                            <div className="flex flex-col gap-1">
                                <Input
                                    placeholder="name"
                                    name="name"
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
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Button type="submit" disabled={isPending}>
                        Create
                    </Button>
                    {Boolean(!isPending && id) && (
                        <Button onClick={onSeeLocationClick} variant="outline">
                            See the created location
                        </Button>
                    )}
                </div>
                <Message message={errorMessage} variant="error" />
                <Message message={successMessage} variant="success" />
            </form>
        </Card>
    );
}

export default Content;
