import { useCallback, type ReactElement, type SubmitEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useCreateBill } from '@/api/orval/generated/endpoints/bill';
import {
    createBillSchema,
    type TCreateBillSchema,
} from '@/features/bill/create/schemas/createBillSchema';
import ConsumersSelector from '@/features/bill/shared/components/ConsumersSelector';
import LocationSelector from '@/features/bill/shared/components/LocationSelector';
import ReceiverSelector from '@/features/bill/shared/components/ReceiverSelector';
import { invalidateBillQueries } from '@/features/bill/shared/utils/invalidateBillQueries';
import Button from '@/features/shared/components/atoms/Button';
import Card from '@/features/shared/components/atoms/Card';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import FormController from '@/features/shared/components/molecules/FormController';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function Content(): ReactElement {
    const navigate = useNavigate();

    const request = useCreateBill();
    const isPending = request.isPending;

    const form = useForm<TCreateBillSchema>({
        resolver: zodResolver(createBillSchema),
        mode: 'onChange',
        defaultValues: {
            amount: '',
            description: '',
            purchasedAt: '',
            receiverId: '',
            locationId: '',
            consumerIds: [],
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
                .then(() => invalidateBillQueries());
        })();
    };

    const id = request.data?.data?.data?.id;

    const onSeeBillClick = useCallback(() => {
        if (id) {
            form.reset();
            request.reset();

            navigate(`/bills/${id}`);
        }
    }, [id, form, request, navigate]);

    const successMessage = request.data?.data?.message;
    const errorMessage = getApiErrorMessage(request.error);

    return (
        <Card className="h-max">
            <form onSubmit={onSubmit} className="flex flex-col gap-4 overflow-hidden">
                <FormController
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <Input
                            placeholder="amount"
                            name="amount"
                            onChange={isPending ? () => {} : field.onChange}
                            value={field.value}
                            disabled={isPending}
                        />
                    )}
                />
                <FormController
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <Input
                            placeholder="description"
                            name="description"
                            onChange={isPending ? () => {} : field.onChange}
                            value={field.value}
                            disabled={isPending}
                        />
                    )}
                />
                <FormController
                    control={form.control}
                    name="purchasedAt"
                    render={({ field }) => (
                        <Input
                            placeholder="purchased at"
                            name="purchasedAt"
                            type="date"
                            onChange={isPending ? () => {} : field.onChange}
                            value={field.value}
                            disabled={isPending}
                        />
                    )}
                />
                <FormController
                    control={form.control}
                    name="receiverId"
                    render={({ field }) => (
                        <ReceiverSelector
                            value={field.value as string}
                            onChange={field.onChange}
                            disabled={isPending}
                        />
                    )}
                />
                <FormController
                    control={form.control}
                    name="locationId"
                    render={({ field }) => (
                        <LocationSelector
                            value={field.value as string}
                            onChange={field.onChange}
                            disabled={isPending}
                        />
                    )}
                />
                <FormController
                    control={form.control}
                    name="consumerIds"
                    render={({ field }) => (
                        <ConsumersSelector
                            value={field.value as string[]}
                            onChange={field.onChange}
                            disabled={isPending}
                        />
                    )}
                />
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Button type="submit" disabled={isPending}>
                        Create
                    </Button>
                    {Boolean(!isPending && id) && (
                        <Button onClick={onSeeBillClick} variant="outline">
                            See the created bill
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
