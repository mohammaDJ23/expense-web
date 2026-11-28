import { useCallback, useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import Input from '@/features/shared/components/atoms/Input';

import SearchResult from './SearchResult';

interface IDefaultData {
    id: string;
    name: string;
}

interface IProps<TData, TResponse> {
    name: string;
    placeholder: string;
    disabled: boolean;
    data?: TData[];
    isError: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    reset: boolean;
    initialValue?: TData | null;
    onChange: (value: TData) => void;
    onSearchChange: (search: string) => void;
    api: () => TResponse;
}

const WAIT = 400;
const MIN_SEARCH_LENGTH = 2;

function SearchSelector<TData extends IDefaultData, TResponse = unknown>({
    name,
    placeholder,
    disabled,
    data = [],
    isError,
    isFetching,
    isSuccess,
    reset,
    initialValue = null,
    onChange: onReceivedChange,
    onSearchChange,
    api,
}: Readonly<IProps<TData, TResponse>>): ReactElement {
    const [search, setSearch] = useState<string>(initialValue?.name || '');
    const [selectedItem, setSelectedItem] = useState<TData | null>(initialValue);

    useEffect(() => {
        if (disabled) {
            return;
        }

        if (reset) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearch('');
            setSelectedItem(null);
        }
    }, [reset, disabled]);

    useEffect(() => {
        if (disabled) {
            return;
        }

        onSearchChange(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, disabled]);

    const debouncedApi = useDebouncedCallback(api, WAIT);

    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            if (disabled) {
                return;
            }

            const value = event.target.value;

            setSearch(value);

            if (value.length < MIN_SEARCH_LENGTH) {
                return;
            }

            debouncedApi();
        },
        [disabled, debouncedApi],
    );

    const onItemMouseDown = useCallback(
        (item: TData) => {
            if (disabled) {
                return;
            }

            setSearch(item.name);

            onReceivedChange(item);

            setSelectedItem(item);
        },
        [disabled, onReceivedChange],
    );

    const onBlur = useCallback(() => {
        if (disabled) {
            return;
        }

        if (selectedItem) {
            setSearch(selectedItem.name);

            onReceivedChange(selectedItem);
        } else {
            setSearch('');
        }
    }, [onReceivedChange, selectedItem, disabled]);

    return (
        <div className="w-full flex flex-col gap-4">
            <Input
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={search}
                disabled={disabled}
            />
            <SearchResult
                data={data}
                isError={isError}
                isSuccess={isSuccess}
                isFetching={isFetching}
                onItemMouseDown={onItemMouseDown}
            />
        </div>
    );
}

export default SearchSelector;
