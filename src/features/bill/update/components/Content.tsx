import { useParams } from 'react-router';

import { useFindBill } from '@/api/orval/generated/endpoints/bill';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import UpdateForm from './updateForm';

import type { ReactNode } from 'react';

function Content(): ReactNode {
    const params = useParams();

    const id = params.id;

    const request = useFindBill(id!, {
        query: {
            enabled: Boolean(id),
            select: getApiResponse,
        },
    });

    if (request.isError) {
        return (
            <div className="flex items-center justify-center">
                <Typography>Failed to fetch the bill details</Typography>
            </div>
        );
    }

    if (request.isLoading) {
        return (
            <Card className="flex flex-col gap-4 h-max">
                <Skeleton className="w-full h-11" />
                <Skeleton className="w-full h-11" />
                <Skeleton className="w-full h-11" />
                <Skeleton className="w-full h-11" />
                <Skeleton className="w-full h-11" />
                <Skeleton className="w-full h-11" />
            </Card>
        );
    }

    if (request.isSuccess) {
        return <UpdateForm bill={request.data} />;
    }

    return null;
}

export default Content;
