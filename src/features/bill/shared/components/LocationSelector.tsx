import { useEffect, useState, type ReactNode } from 'react';

import { useSearchLocations } from '@/api/orval/generated/endpoints/location';
import { useSearchApiSelector } from '@/features/bill/shared/hooks/useSearchApiSelector';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import SearchSelector from './SearchSelector';

interface IProps {
    value?: string;
    disabled?: boolean;
    onChange?(value: string): void;
}

function LocationSelector({
    value = '',
    disabled = false,
    onChange = () => {},
}: Readonly<IProps>): ReactNode {
    const [search, setSearch] = useState<string>('');

    const request = useSearchLocations(
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
            name="locationId"
            placeholder="location"
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

export default LocationSelector;
