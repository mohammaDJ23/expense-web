import { X } from 'lucide-react';

import Badge from '@/features/shared/components/atoms/Badge';
import Card from '@/features/shared/components/atoms/Card';
import Input from '@/features/shared/components/atoms/Input';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';

import type { ChangeEvent, MouseEvent, ReactElement } from 'react';

interface IData {
    id: string;
    name: string;
}

interface IProps<TData> {
    q?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    showSearchResult?: boolean;
    searchedData?: TData[];
    multiSelectors?: TData[];
    isError?: boolean;
    isFetching?: boolean;
    isSuccess?: boolean;
    onSelectedItemRemove?(item: TData): void;
    onInputBlur?(): void;
    onInputChange?(event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void;
    onItemMousedown?(event: MouseEvent<HTMLDivElement>, item: TData): void;
}

function SearchSelector<TData extends IData>({
    q = '',
    name,
    placeholder = '',
    disabled = false,
    showSearchResult = false,
    searchedData = [],
    multiSelectors = [],
    isError = false,
    isFetching = false,
    isSuccess = false,
    onSelectedItemRemove = () => {},
    onInputBlur = () => {},
    onInputChange = () => {},
    onItemMousedown = () => {},
}: Readonly<IProps<TData>>): ReactElement {
    return (
        <div className="w-full flex flex-col gap-4">
            <Input
                placeholder={placeholder}
                name={name}
                onChange={onInputChange}
                onBlur={onInputBlur}
                value={q}
                disabled={disabled}
            />
            {multiSelectors.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    {multiSelectors.map((item) => (
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
            {showSearchResult && (
                <Card className="size-full flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto">
                    {isError && (
                        <Typography className="text-center">Faild to search the data</Typography>
                    )}
                    {isFetching && (
                        <div className="flex size-full flex-auto flex-col gap-2">
                            <Skeleton className="w-full h-[39.8px]" />
                            <Skeleton className="w-full h-[39.8px]" />
                            <Skeleton className="w-full h-[39.8px]" />
                        </div>
                    )}
                    {isSuccess && searchedData.length > 0 && (
                        <div className="flex size-full flex-auto flex-col gap-2">
                            {searchedData.map((item) => (
                                <div
                                    key={item.id}
                                    onMouseDown={(event) => onItemMousedown(event, item)}
                                    className="shrink-0 group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-colors hover:bg-success-background"
                                >
                                    <Typography className="group-hover:text-primary truncate">
                                        {item.name}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    )}
                    {isSuccess && searchedData.length <= 0 && (
                        <Typography className="text-center">No items found</Typography>
                    )}
                </Card>
            )}
        </div>
    );
}

export default SearchSelector;
