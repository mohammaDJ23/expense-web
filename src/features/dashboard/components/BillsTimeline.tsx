import { useId, type ReactNode } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { useFindBillsTimeline } from '@/api/orval/generated/endpoints/bill';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

function BillsTimeline(): ReactNode {
    const request = useFindBillsTimeline(undefined, {
        query: {
            select: getApiResponse,
        },
    });

    const gradientId = useId();

    if (request.isLoading) {
        return <Skeleton className="w-full min-h-96" />;
    }

    if (request.isError) {
        return (
            <Card className="min-h-96 flex flex-col items-center justify-center">
                <Typography className="text-center">Failed to load the bills timeline</Typography>
            </Card>
        );
    }

    if (request.isSuccess) {
        const data = request.data.map((item) => ({
            ...item,
            date: new Date(item.date).getTime(),
        }));

        if (data.length <= 0) {
            return null;
        }

        return (
            <Card
                style={{ width: '100%', height: '384px' }}
                className="outline-none **:outline-none"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            stroke="var(--border)"
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            type="number"
                            scale="time"
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={(value: number) => new Date(value).toLocaleDateString()}
                            stroke="var(--text-muted)"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            minTickGap={30}
                        />
                        <YAxis
                            domain={[0, 'auto']}
                            allowDecimals={false}
                            stroke="var(--text-muted)"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            width={40}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                color: 'var(--text)',
                            }}
                            labelStyle={{
                                color: 'var(--text-muted)',
                            }}
                            itemStyle={{
                                color: 'var(--primary)',
                            }}
                            labelFormatter={(value) => new Date(Number(value)).toLocaleDateString()}
                        />
                        <Area
                            type="monotone"
                            dataKey="count"
                            name="Bills"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fill={`url(#${gradientId})`}
                            activeDot={{
                                r: 5,
                                fill: 'var(--primary)',
                                stroke: 'var(--surface)',
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        );
    }

    return null;
}

export default BillsTimeline;
