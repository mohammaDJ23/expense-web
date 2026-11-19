import { useFindMostUsedReceivers } from '@/api/orval/generated/endpoints/bill';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import UsedIndicator from './UsedIndicator';

import type { ReactNode } from 'react';

function MostUsedReceivers(): ReactNode {
    const request = useFindMostUsedReceivers(
        { limit: 5 },
        {
            query: {
                select: getApiResponse,
            },
        },
    );

    if (request.isLoading) {
        return <Skeleton className="min-h-[296.484px] w-full" />;
    }

    if (request.isError) {
        return (
            <Card className="min-h-[296.484px] flex flex-col items-center justify-center">
                <Typography className="text-center">
                    Failed to load the most used receivers
                </Typography>
            </Card>
        );
    }

    if (request.isSuccess) {
        const data = request.data;

        if (data.length <= 0) {
            return (
                <Card className="min-h-[296.484px] flex flex-col items-center justify-center">
                    <Typography className="text-center">Not any receivers used yet</Typography>
                </Card>
            );
        }

        const maxCount = Math.max(...data.map((item) => item.total));

        return (
            <Card className="flex min-h-[296.484px] flex-col gap-3">
                <Typography variant="heading-4">Most used receivers</Typography>
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

export default MostUsedReceivers;
