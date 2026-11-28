import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';

import type { ReactNode } from 'react';

interface IDefaultData {
    id: string;
    name: string;
}

interface IProps<TData> {
    data: TData[];
    isError: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    onItemMouseDown: (item: TData) => void;
}

function SearchResult<TData extends IDefaultData>({
    data,
    isError,
    isFetching,
    isSuccess,
    onItemMouseDown,
}: Readonly<IProps<TData>>): ReactNode {
    return (
        (isError || isFetching || isSuccess) && (
            <Card className="size-full flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto">
                {isError && (
                    <Typography className="text-center">Faild to search the data</Typography>
                )}
                {isFetching && (
                    <div className="flex size-full flex-auto flex-col gap-2">
                        <Skeleton className="w-full h-[39.8px]" />
                    </div>
                )}
                {isSuccess && data.length > 0 && (
                    <div className="flex size-full flex-auto flex-col gap-2">
                        {data.map((item) => (
                            <div
                                key={item.id}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    onItemMouseDown(item);
                                }}
                                className="shrink-0 group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-colors hover:bg-success-background"
                            >
                                <Typography className="group-hover:text-primary truncate">
                                    {item.name}
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}
                {isSuccess && data.length <= 0 && (
                    <Typography className="text-center">No items found</Typography>
                )}
            </Card>
        )
    );
}

export default SearchResult;
