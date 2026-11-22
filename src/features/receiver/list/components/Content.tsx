import { memo, type ReactNode } from 'react';

import {
    findReceiverList,
    getFindReceiverListQueryKey,
} from '@/api/orval/generated/endpoints/receiver';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { useInfiniteQuery } from '@/features/shared/hooks/useInfiniteQuery';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import Item from './Item';

function Content(): ReactNode {
    const request = useInfiniteQuery({
        queryKey: getFindReceiverListQueryKey(),
        queryFn: ({ pageParam }) =>
            findReceiverList({
                cursor: pageParam,
            }).then(getApiResponse),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : undefined),
    });

    if (request.isError) {
        return (
            <div className="flex items-center justify-center">
                <Typography>Failed to fetch the receiver list</Typography>
            </div>
        );
    }

    if (request.isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 20 }).map((_, index) => (
                    <Skeleton key={index} className="min-h-38 w-full" />
                ))}
            </div>
        );
    }

    if (request.isSuccess && request.total <= 0) {
        return (
            <div className="flex items-center justify-center">
                <Typography>No receivers created yet</Typography>
            </div>
        );
    }

    if (request.isSuccess && request.total > 0) {
        const { ref } = request;

        return (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {request.items.map((item) => (
                    <Item key={item.id} {...item} />
                ))}
                {request.isFetchingNextPage &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="min-h-38 w-full" />
                    ))}
                {request.hasNextPage && <div ref={ref}></div>}
            </div>
        );
    }

    return null;
}

export default memo(Content);
