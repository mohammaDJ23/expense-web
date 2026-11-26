import { memo, useCallback, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useFindReceiver } from '@/api/orval/generated/endpoints/receiver';
import Button from '@/features/shared/components/atoms/Button';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import DeleteReceiverButton from './DeleteReceiverButton';

function Content(): ReactNode {
    const navigate = useNavigate();
    const params = useParams();

    const id = params.id;

    const request = useFindReceiver(id!, {
        query: {
            enabled: Boolean(id),
            select: getApiResponse,
        },
    });

    const onUpdateClick = useCallback(() => {
        if (id) {
            navigate(`/receivers/update/${id}`);
        }
    }, [navigate, id]);

    if (request.isError) {
        return (
            <div className="flex items-center justify-center">
                <Typography>Failed to fetch the receiver details</Typography>
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
                        {request.data.name}
                    </Typography>
                </Card>
                <Card className="flex flex-col gap-4">
                    <Typography truncate={false}>
                        Created at: {new Date(request.data.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography truncate={false}>
                        Updated at: {new Date(request.data.updatedAt).toLocaleDateString()}
                    </Typography>
                </Card>
                <Card className="flex items-center flex-wrap gap-2">
                    <Button onClick={() => onUpdateClick()}>Update</Button>
                    <DeleteReceiverButton />
                </Card>
            </div>
        );
    }

    return null;
}

export default memo(Content);
