import { useCallback, useState, type ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type { QueryObserverResult } from '@tanstack/react-query';

interface IProps<TApiData> {
    disabled: boolean;
    api: () => Promise<QueryObserverResult<TApiData>>;
}

const WAIT = 400;
const MIN_SEARCH_LENGTH = 2;

export function useSearchApi<TApiData = unknown>({ disabled, api }: IProps<TApiData>) {
    const [search, setSearch] = useState<string>('');
    const [showSearchResult, setShowSearchResult] = useState<boolean>(false);

    const debouncedApi = useDebouncedCallback(() => {
        setShowSearchResult(true);

        api();
    }, WAIT);

    const onInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            if (disabled) {
                return;
            }

            const value = event.target.value;

            setSearch(value);

            setShowSearchResult(false);

            if (value.length < MIN_SEARCH_LENGTH) {
                return;
            }

            debouncedApi();
        },
        [disabled, debouncedApi],
    );

    return {
        onInputChange,
        setSearch,
        setShowSearchResult,
        search,
        showSearchResult,
    };
}
