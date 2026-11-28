import { useCallback, useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
import { X } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import Badge from '@/features/shared/components/atoms/Badge';
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
    initialValue?: TData[];
    onChange: (value: TData[]) => void;
    onSearchChange: (search: string) => void;
    api: () => TResponse;
}

const WAIT = 400;
const MIN_SEARCH_LENGTH = 2;

function SearchMultipleSelector<TData extends IDefaultData, TResponse = unknown>({
    name,
    placeholder,
    disabled,
    data = [],
    isError,
    isFetching,
    isSuccess,
    reset,
    initialValue = [],
    onChange: onReceivedChange,
    onSearchChange,
    api,
}: Readonly<IProps<TData, TResponse>>): ReactElement {
    const [search, setSearch] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<TData[]>(initialValue);

    useEffect(() => {
        if (disabled) {
            return;
        }

        if (reset) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearch('');
            setSelectedItems([]);
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

            setSearch('');

            let currentState = [...selectedItems];

            const index = currentState.findIndex((current) => current.id === item.id);

            if (index <= -1) {
                currentState = currentState.concat(item);
            }

            setSelectedItems(currentState);
            onReceivedChange(currentState);
        },
        [disabled, selectedItems, onReceivedChange],
    );

    const onBlur = useCallback(() => {
        if (disabled) {
            return;
        }

        setSearch('');
    }, [disabled]);

    const onSelectedItemRemove = useCallback(
        (item: TData) => {
            if (disabled) {
                return;
            }

            let currentState = [...selectedItems];

            currentState = currentState.filter((current) => current.id !== item.id);

            setSelectedItems(currentState);
            onReceivedChange(currentState);
        },
        [disabled, selectedItems, onReceivedChange],
    );

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
            {selectedItems.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    {selectedItems.map((item) => (
                        <Badge
                            key={item.id}
                            icon={X}
                            onIconClick={() => onSelectedItemRemove(item)}
                        >
                            {item.name}
                        </Badge>
                    ))}
                </div>
            )}
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

export default SearchMultipleSelector;
