import { useEffect, useState, type ReactNode } from 'react';

import { useSearchReceivers } from '@/api/orval/generated/endpoints/receiver';
import { useSearchApiSelector } from '@/features/bill/shared/hooks/useSearchApiSelector';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import SearchSelector from './SearchSelector';

interface IProps {
    value?: string;
    disabled?: boolean;
    onChange?(value: string): void;
}

function ReceiverSelector({
    value = '',
    disabled = false,
    onChange = () => {},
}: Readonly<IProps>): ReactNode {
    const [search, setSearch] = useState<string>('');

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

    const searchApiSelector = useSearchApiSelector({
        value,
        disabled,
        onChange,
        api: () => request.refetch(),
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearch(searchApiSelector.search);
    }, [searchApiSelector.search]);

    return (
        <SearchSelector
            q={search}
            name="receiverId"
            placeholder="receiver"
            disabled={disabled}
            showSearchResult={searchApiSelector.showSearchResult}
            searchedData={request.data}
            isError={request.isError}
            isFetching={request.isFetching}
            isSuccess={request.isSuccess}
            onInputBlur={searchApiSelector.onInputBlur}
            onInputChange={searchApiSelector.onInputChange}
            onItemMousedown={searchApiSelector.onItemMousedown}
        />
    );
}

export default ReceiverSelector;
