import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { useUpdateBill } from '@/api/orval/generated/endpoints/bill';
import ConsumersSelector from '@/features/bill/shared/components/ConsumersSelector';
import LocationSelector from '@/features/bill/shared/components/LocationSelector';
import ReceiverSelector from '@/features/bill/shared/components/ReceiverSelector';
import { invalidateBillQueries } from '@/features/bill/shared/utils/invalidateBillQueries';
import {
    updateBillSchema,
    type TUpdateBillSchema,
} from '@/features/bill/update/schemas/updateBillSchema';
import Button from '@/features/shared/components/atoms/Button';
import Card from '@/features/shared/components/atoms/Card';
import Input from '@/features/shared/components/atoms/Input';
import Message from '@/features/shared/components/atoms/Message';
import FormController from '@/features/shared/components/molecules/FormController';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

import type { BillResponseDto } from '@/api/orval/generated/models';
import type { ReactElement, SubmitEvent } from 'react';

interface IProps {
    bill: BillResponseDto;
}

function UpdateForm({ bill }: Readonly<IProps>): ReactElement {
    const navigate = useNavigate();
    const params = useParams();

    const id = params.id;

    const request = useUpdateBill();
    const isPending = request.isPending;

    const form = useForm<TUpdateBillSchema>({
        resolver: zodResolver(updateBillSchema),
        mode: 'onChange',
        defaultValues: {
            id: bill.id || '',
            amount: bill.amount || '',
            description: bill.description || '',
            purchasedAt: bill.purchasedAt ? format(new Date(bill.purchasedAt), 'yyyy-MM-dd') : '',
            receiverId: bill.receiver.id || '',
            locationId: bill.location.id || '',
            consumerIds: bill.consumers.map((consumer) => consumer.id) || [],
        },
    });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isPending || !id) {
            return;
        }

        form.handleSubmit((data) => {
            request.reset();

            request
                .mutateAsync({ data })
                .then(() => invalidateBillQueries(id))
                .then(() => form.reset())
                .then(() => request.reset())
                .then(() => navigate(`/bills/${id}`));
        })();
    };

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
                            initialValue={bill.receiver}
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
                            initialValue={bill.location}
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
                            initialValue={bill.consumers}
                            onChange={field.onChange}
                            disabled={isPending}
                        />
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    Update
                </Button>
                <Message message={errorMessage} variant="error" />
            </form>
        </Card>
    );
}

export default UpdateForm;
