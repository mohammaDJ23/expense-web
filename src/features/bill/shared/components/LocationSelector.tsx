import { useEffect, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
    getSearchLocationsQueryKey,
    useSearchLocations,
} from '@/api/orval/generated/endpoints/location';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import SearchSelector from './SearchSelector';

import type { LocationResponseDto } from '@/api/orval/generated/models';

interface IProps {
    value?: string;
    disabled?: boolean;
    initialValue?: LocationResponseDto;
    onChange?(value: string): void;
}

function LocationSelector({
    value = '',
    disabled = false,
    initialValue,
    onChange = () => {},
}: Readonly<IProps>): ReactNode {
    const reset = value.length <= 0;

    const [search, setSearch] = useState<string>('');

    const queryClient = useQueryClient();

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

    useEffect(() => {
        if (disabled) {
            return;
        }

        if (reset) {
            queryClient.resetQueries({ queryKey: getSearchLocationsQueryKey() });
        }

        return () => {
            queryClient.resetQueries({ queryKey: getSearchLocationsQueryKey() });
        };
    }, [reset, disabled, queryClient]);

    return (
        <SearchSelector
            name="locationId"
            placeholder="location"
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

export default LocationSelector;
