import { useCallback, useEffect, useState, type MouseEvent } from 'react';

import { useSearchApi } from '@/features/shared/hooks/useSearchApi';

import type { QueryObserverResult } from '@tanstack/react-query';

interface IProps<TData, TApiData> {
    value: string;
    disabled: boolean;
    initialSelectedItem?: TData | null;
    onChange: (value: string) => void;
    api: () => Promise<QueryObserverResult<TApiData>>;
}

interface IData {
    id: string;
    name: string;
}

export function useSearchApiSelector<TData extends IData, TApiData = unknown>({
    value,
    disabled,
    initialSelectedItem = null,
    api,
    onChange,
}: IProps<TData, TApiData>) {
    const [selectedItem, setSelectedItem] = useState<TData | null>(initialSelectedItem);

    const reset = value.length <= 0;

    const searchApi = useSearchApi<TApiData>({
        disabled,
        api,
    });

    useEffect(() => {
        if (disabled) {
            return;
        }

        if (reset) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedItem(null);
            searchApi.setSearch('');
        }
    }, [reset, disabled]);

    const onItemMousedown = useCallback(
        (event: MouseEvent<HTMLDivElement>, item: TData) => {
            event.preventDefault();

            if (disabled) {
                return;
            }

            searchApi.setShowSearchResult(false);
            searchApi.setSearch(item.name);

            setSelectedItem(item);

            onChange(item.id);
        },
        [disabled, searchApi, onChange],
    );

    const onInputBlur = useCallback(() => {
        if (disabled) {
            return;
        }

        searchApi.setShowSearchResult(false);

        if (!value) {
            searchApi.setSearch('');
        } else if (selectedItem) {
            searchApi.setSearch(selectedItem.name);

            onChange(selectedItem.id);
        }
    }, [selectedItem, searchApi, onChange, value, disabled]);

    return {
        onInputChange: searchApi.onInputChange,
        onItemMousedown,
        onInputBlur,
        search: searchApi.search,
        showSearchResult: searchApi.showSearchResult,
    };
}
