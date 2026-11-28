import { useEffect, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
    getSearchConsumersQueryKey,
    useSearchConsumers,
} from '@/api/orval/generated/endpoints/consumer';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import SearchMultipleSelector from './SearchMultipleSelector';

import type { ConsumerResponseDto } from '@/api/orval/generated/models';

interface IProps {
    value?: string[];
    disabled?: boolean;
    initialValue?: ConsumerResponseDto[];
    onChange?(value: string[]): void;
}

function ConsumersSelector({
    value = [],
    disabled = false,
    initialValue,
    onChange = () => {},
}: Readonly<IProps>): ReactNode {
    const reset = value.length <= 0;

    const [search, setSearch] = useState<string>('');

    const queryClient = useQueryClient();

    const request = useSearchConsumers(
        {
            q: search.trim(),
            limit: 5,
        },
        {
            query: {
                enabled: false,
                select: getApiResponse,
            },
        },
    );

    useEffect(() => {
        if (disabled) {
            return;
        }

        if (reset) {
            queryClient.resetQueries({ queryKey: getSearchConsumersQueryKey() });
        }

        return () => {
            queryClient.resetQueries({ queryKey: getSearchConsumersQueryKey() });
        };
    }, [reset, disabled, queryClient]);

    return (
        <SearchMultipleSelector
            name="consumerIds"
            placeholder="consumers"
            disabled={disabled}
            data={request.data}
            isError={request.isError}
            isFetching={request.isFetching}
            isSuccess={request.isSuccess}
            initialValue={initialValue}
            reset={reset}
            onChange={(items) => onChange(items.map((item) => item.id))}
            onSearchChange={setSearch}
            api={request.refetch}
        />
    );
}

export default ConsumersSelector;
