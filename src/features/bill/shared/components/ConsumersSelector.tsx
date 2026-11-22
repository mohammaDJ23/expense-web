import { useEffect, useState, type ReactNode } from 'react';

import { useSearchConsumers } from '@/api/orval/generated/endpoints/consumer';
import { useSearchApiMultiSelector } from '@/features/bill/shared/hooks/useSearchApiMultiSelector';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import SearchSelector from './SearchSelector';

interface IProps {
    value?: string[];
    disabled?: boolean;
    onChange?(value: string[]): void;
}

function ConsumersSelector({
    value = [],
    disabled = false,
    onChange = () => {},
}: Readonly<IProps>): ReactNode {
    const [search, setSearch] = useState<string>('');

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

    const searchApiMultiSelector = useSearchApiMultiSelector({
        value,
        disabled,
        onChange,
        api: () => request.refetch(),
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearch(searchApiMultiSelector.search);
    }, [searchApiMultiSelector.search]);

    return (
        <SearchSelector
            q={search}
            name="consumerIds"
            placeholder="consumers"
            disabled={disabled}
            showSearchResult={searchApiMultiSelector.showSearchResult}
            searchedData={request.data}
            isError={request.isError}
            isFetching={request.isFetching}
            isSuccess={request.isSuccess}
            multiSelectors={searchApiMultiSelector.selectedItems}
            onSelectedItemRemove={searchApiMultiSelector.onSelectedItemRemove}
            onInputBlur={searchApiMultiSelector.onInputBlur}
            onInputChange={searchApiMultiSelector.onInputChange}
            onItemMousedown={searchApiMultiSelector.onItemMousedown}
        />
    );
}

export default ConsumersSelector;
