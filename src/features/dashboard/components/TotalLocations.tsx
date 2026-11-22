import { useFindTotalLocations } from '@/api/orval/generated/endpoints/location';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import type { ReactNode } from 'react';

function TotalLocations(): ReactNode {
    const request = useFindTotalLocations({
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
                <Typography className="text-center">Failed to load the total locations</Typography>
            </Card>
        );
    }

    if (request.isSuccess) {
        const total = request.data.total;

        return (
            <Card className="min-h-26 flex flex-col justify-between">
                <Typography variant="heading-4">{total.toLocaleString()}</Typography>
                <Typography>Total locations</Typography>
            </Card>
        );
    }

    return null;
}

export default TotalLocations;
