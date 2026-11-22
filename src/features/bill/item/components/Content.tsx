import { memo, useCallback, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useFindBill } from '@/api/orval/generated/endpoints/bill';
import Badge from '@/features/shared/components/atoms/Badge';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

function Content(): ReactNode {
    const navigate = useNavigate();
    const params = useParams();

    const id = params.id;

    const request = useFindBill(id!, {
        query: {
            enabled: Boolean(id),
            select: getApiResponse,
        },
    });

    const onConsumerClick = useCallback(
        (id: string) => {
            navigate(`/consumers/${id}`);
        },
        [navigate],
    );

    const onReceiverClick = useCallback(
        (id: string) => {
            navigate(`/receivers/${id}`);
        },
        [navigate],
    );

    const onLocationClick = useCallback(
        (id: string) => {
            navigate(`/locations/${id}`);
        },
        [navigate],
    );

    if (request.isError) {
        return (
            <div className="flex items-center justify-center">
                <Typography>Failed to fetch the bill details</Typography>
            </div>
        );
    }

    if (request.isLoading) {
        return (
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="min-h-6 w-full max-w-xl" />
                </div>
                <div className="flex flex-col gap-4">
                    <Skeleton className="min-h-6 w-full max-w-sm" />
                    <Skeleton className="min-h-6 w-full max-w-md" />
                    <Skeleton className="min-h-6 w-full max-w-xs" />
                    <Skeleton className="min-h-6 w-full max-w-lg" />
                </div>
            </div>
        );
    }

    if (request.isSuccess) {
        return (
            <div className="flex flex-col gap-4">
                <Card>
                    <Typography truncate={false} variant="heading-4">
                        {Number(request.data.amount).toLocaleString()}
                    </Typography>
                </Card>
                <Card>
                    <Typography truncate={false}>{request.data.description}</Typography>
                </Card>
                <Card className="flex flex-col gap-4">
                    <Typography truncate={false}>
                        Receiver:{' '}
                        <Typography
                            onClick={() => onReceiverClick(request.data.receiver.id)}
                            as="span"
                            className="cursor-pointer"
                        >
                            {request.data.receiver.name}
                        </Typography>
                    </Typography>
                    <Typography truncate={false}>
                        Location:{' '}
                        <Typography
                            onClick={() => onLocationClick(request.data.location.id)}
                            as="span"
                            className="cursor-pointer"
                        >
                            {request.data.location.name}
                        </Typography>
                    </Typography>
                    <div className="flex flex-col gap-1">
                        <Typography truncate={false} className="shrink-0">
                            Consumers:
                        </Typography>
                        <div className="flex items-center gap-1 flex-wrap">
                            {request.data.consumers.map((consumer) => (
                                <Badge
                                    className="cursor-pointer"
                                    key={consumer.id}
                                    onClick={() => onConsumerClick(consumer.id)}
                                >
                                    {consumer.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </Card>
                <Card className="flex flex-col gap-4">
                    <Typography truncate={false}>
                        Purchased at: {new Date(request.data.purchasedAt).toLocaleDateString()}
                    </Typography>
                    <Typography truncate={false}>
                        Created at: {new Date(request.data.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography truncate={false}>
                        Updated at: {new Date(request.data.updatedAt).toLocaleDateString()}
                    </Typography>
                </Card>
            </div>
        );
    }

    return null;
}

export default memo(Content);
