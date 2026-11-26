import { useCallback, useEffect, useState, type MouseEvent } from 'react';

import { useSearchApi } from '@/features/shared/hooks/useSearchApi';

import type { QueryObserverResult } from '@tanstack/react-query';

interface IProps<TData, TApiData> {
    value: string[];
    disabled: boolean;
    initialSelectedItems?: TData[];
    onChange: (value: string[]) => void;
    api: () => Promise<QueryObserverResult<TApiData>>;
}

interface IData {
    id: string;
    name: string;
}

export function useSearchApiMultiSelector<TData extends IData, TApiData = unknown>({
    value,
    disabled,
    initialSelectedItems = [],
    api,
    onChange,
}: IProps<TData, TApiData>) {
    const [selectedItems, setSelectedItems] = useState<TData[]>(initialSelectedItems);

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
            setSelectedItems([]);
            searchApi.setSearch('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset, disabled]);

    const onItemMousedown = useCallback(
        (event: MouseEvent<HTMLDivElement>, item: TData) => {
            event.preventDefault();

            if (disabled) {
                return;
            }

            searchApi.setShowSearchResult(false);
            searchApi.setSearch('');

            setSelectedItems((current) => {
                const index = current.findIndex((currentState) => currentState.id === item.id);

                if (index <= -1) {
                    return current.concat(item);
                }

                return current;
            });

            const index = value.findIndex((currentValue) => currentValue === item.id);

            if (index <= -1) {
                onChange(value.concat(item.id));
            }
        },
        [disabled, value, onChange, searchApi],
    );

    const onInputBlur = useCallback(() => {
        if (disabled) {
            return;
        }

        searchApi.setShowSearchResult(false);
        searchApi.setSearch('');
    }, [searchApi, disabled]);

    const onSelectedItemRemove = useCallback(
        (item: TData) => {
            if (disabled) {
                return;
            }

            setSelectedItems((current) =>
                current.filter((currentState) => currentState.id === item.id),
            );

            onChange(value.filter((currentValue) => currentValue === item.id));
        },
        [disabled, value, onChange],
    );

    return {
        onInputChange: searchApi.onInputChange,
        onItemMousedown,
        onInputBlur,
        onSelectedItemRemove,
        selectedItems,
        search: searchApi.search,
        showSearchResult: searchApi.showSearchResult,
    };
}
