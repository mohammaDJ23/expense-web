import Typography from '@/features/shared/components/atoms/Typography';

import type { ReactElement } from 'react';

interface IProps {
    name: string;
    total: number;
    maxCount: number;
}

function UsedIndicator({ name, total, maxCount }: Readonly<IProps>): ReactElement {
    return (
        <div className="flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center justify-between gap-4">
                <Typography>{name}</Typography>
                <Typography>{total}</Typography>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-secondary">
                <div
                    className="h-full rounded-full bg-primary"
                    style={{
                        width: `${(total / maxCount) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
}

export default UsedIndicator;
