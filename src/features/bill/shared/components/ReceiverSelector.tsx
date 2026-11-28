import { useEffect, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
    getSearchReceiversQueryKey,
    useSearchReceivers,
} from '@/api/orval/generated/endpoints/receiver';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import SearchSelector from './SearchSelector';

import type { ReceiverResponseDto } from '@/api/orval/generated/models';

interface IProps {
    value?: string;
    disabled?: boolean;
    initialValue?: ReceiverResponseDto;
    onChange?(value: string): void;
}

function ReceiverSelector({
    value = '',
    disabled = false,
    initialValue,
    onChange = () => {},
}: Readonly<IProps>): ReactNode {
    const reset = value.length <= 0;

    const [search, setSearch] = useState<string>('');

    const queryClient = useQueryClient();

    const request = useSearchReceivers(
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
            queryClient.resetQueries({ queryKey: getSearchReceiversQueryKey() });
        }

        return () => {
            queryClient.resetQueries({ queryKey: getSearchReceiversQueryKey() });
        };
    }, [reset, disabled, queryClient]);

    return (
        <SearchSelector
            name="receiverId"
            placeholder="receiver"
            disabled={disabled}
            data={request.data}
            isError={request.isError}
            isFetching={request.isFetching}
            isSuccess={request.isSuccess}
            initialValue={initialValue}
            reset={reset}
            onChange={(item) => onChange(item.id)}
            onSearchChange={setSearch}
            api={request.refetch}
        />
    );
}

export default ReceiverSelector;
