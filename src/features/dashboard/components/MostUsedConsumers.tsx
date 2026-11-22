import { useFindMostUsedConsumers } from '@/api/orval/generated/endpoints/bill';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import UsedIndicator from './UsedIndicator';

import type { ReactNode } from 'react';

function MostUsedConsumers(): ReactNode {
    const request = useFindMostUsedConsumers(
        { limit: 5 },
        {
            query: {
                select: getApiResponse,
            },
        },
    );

    if (request.isLoading) {
        return <Skeleton className="min-h-74 w-full" />;
    }

    if (request.isError) {
        return (
            <Card className="min-h-74 flex flex-col items-center justify-center">
                <Typography className="text-center">
                    Failed to load the most used consumers
                </Typography>
            </Card>
        );
    }

    if (request.isSuccess) {
        const data = request.data;

        if (data.length <= 0) {
            return (
                <Card className="min-h-74 flex flex-col items-center justify-center">
                    <Typography className="text-center">Not any consumer used yet</Typography>
                </Card>
            );
        }

        const maxCount = Math.max(...data.map((item) => item.total));

        return (
            <Card className="flex flex-col gap-3">
                <Typography variant="heading-4">Most used consumers</Typography>
                <div className="flex flex-col gap-2">
                    {data.map((item) => (
                        <UsedIndicator
                            key={item.id}
                            name={item.name}
                            total={item.total}
                            maxCount={maxCount}
                        />
                    ))}
                </div>
            </Card>
        );
    }

    return null;
}

export default MostUsedConsumers;
