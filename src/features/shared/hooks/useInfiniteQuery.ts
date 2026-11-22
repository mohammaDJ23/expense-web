import { useEffect, useRef } from 'react';
import { useInfiniteQuery as useBaseInfinityQuery, type QueryKey } from '@tanstack/react-query';

import type { ErrorType } from '@/api/http/customInstance';
import type { ExceptionDto, HttpResponseDto } from '@/api/orval/generated/models';
// eslint-disable-next-line sonarjs/no-internal-api-use
import type {
    InfiniteData,
    UseInfiniteQueryOptions,
} from 'node_modules/@tanstack/react-query/build/legacy';

interface IInfinitePage<TItem> {
    items: TItem[];
    total: number;
    hasNextPage: boolean;
    nextCursor: string | null;
}

export function useInfiniteQuery<
    TItem,
    TPageParam,
    TQueryKey extends QueryKey = QueryKey,
    TError = ErrorType<HttpResponseDto & { data: ExceptionDto }>,
>(
    options: UseInfiniteQueryOptions<
        IInfinitePage<TItem>,
        TError,
        InfiniteData<IInfinitePage<TItem>>,
        TQueryKey,
        TPageParam
    >,
) {
    const ref = useRef<HTMLDivElement | null>(null);

    const request = useBaseInfinityQuery(options);

    useEffect(() => {
        if (ref.current && request.hasNextPage && !request.isFetchingNextPage) {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry?.isIntersecting) {
                    request.fetchNextPage();
                }
            });

            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }

        return () => {};
    }, [request]);

    const items = request.data?.pages?.flatMap((page) => page.items) ?? [];
    const total = request.data?.pages?.[0]?.total ?? 0;

    return {
        ...request,
        ref,
        items,
        total,
    };
}
