import { useFindBillsPeriod } from '@/api/orval/generated/endpoints/bill';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import type { ReactNode } from 'react';

function BillsPeriod(): ReactNode {
    const request = useFindBillsPeriod({
        query: {
            select: getApiResponse,
        },
    });

    if (request.isLoading) {
        return <Skeleton className="min-h-26 w-full" />;
    }

    if (request.isError) {
        return (
            <Card className="min-h-26 flex flex-col items-center justify-center">
                <Typography className="text-center">Failed to load the bills period</Typography>
            </Card>
        );
    }

    if (request.isSuccess) {
        const start = request.data.start;
        const end = request.data.end;

        if (!start || !end) {
            return (
                <Card className="min-h-26 flex flex-col items-center justify-center">
                    <Typography className="text-center">There is no bills period data</Typography>
                </Card>
            );
        }

        return (
            <Card className="min-h-26 flex flex-col justify-between">
                <Typography variant="heading-4" className="whitespace-nowrap">
                    {new Date(start).toLocaleDateString()} _ {new Date(end).toLocaleDateString()}
                </Typography>
                <Typography>Bills period</Typography>
            </Card>
        );
    }

    return null;
}

export default BillsPeriod;
