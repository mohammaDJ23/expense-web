import { useCallback, type ReactElement } from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router';

import Badge from '@/features/shared/components/atoms/Badge';
import Card from '@/features/shared/components/atoms/Card';
import DragScroll from '@/features/shared/components/atoms/DragScroll';
import Icon from '@/features/shared/components/atoms/Icon';
import Typography from '@/features/shared/components/atoms/Typography';

import type { BillResponseDto, ConsumerResponseDto } from '@/api/orval/generated/models';

interface IProps extends BillResponseDto {}

function Item({
    id,
    amount,
    description,
    createdAt,
    receiver,
    location,
    consumers,
}: Readonly<IProps>): ReactElement {
    const navigate = useNavigate();

    const onDetailsClick = useCallback(() => {
        navigate(`/bills/${id}`);
    }, [navigate, id]);

    const onConsumerClick = useCallback(
        (consumer: ConsumerResponseDto) => {
            navigate(`/consumers/${consumer.id}`);
        },
        [navigate],
    );

    const onReceiverClick = useCallback(() => {
        navigate(`/receivers/${receiver.id}`);
    }, [navigate, receiver]);

    const onLocationClick = useCallback(() => {
        navigate(`/locations/${location.id}`);
    }, [navigate, location]);

    return (
        <Card className="min-h-38 flex flex-col justify-between">
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                    <Typography variant="heading-4">{Number(amount).toLocaleString()}</Typography>
                    <Icon
                        onClick={onDetailsClick}
                        className="shrink-0 cursor-pointer"
                        icon={Info}
                        size="18px"
                    />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <Typography
                        className="cursor-pointer"
                        onClick={onReceiverClick}
                        variant="subtitle"
                    >
                        {receiver.name}
                    </Typography>
                    <Typography
                        className="cursor-pointer shrink-0"
                        onClick={onLocationClick}
                        variant="caption"
                    >
                        {location.name}
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <Typography>{description}</Typography>
                <div className="flex items-center justify-between gap-4">
                    {consumers.length > 0 && (
                        <DragScroll className="flex items-center gap-1 overflow-x-auto overflow-y-hidden whitespace-nowrap">
                            {consumers.map((consumer) => (
                                <Badge
                                    className="cursor-pointer"
                                    key={consumer.id}
                                    onClick={() => onConsumerClick(consumer)}
                                >
                                    {consumer.name}
                                </Badge>
                            ))}
                        </DragScroll>
                    )}
                    <Typography variant="caption" className="shrink-0">
                        {new Date(createdAt).toLocaleDateString()}
                    </Typography>
                </div>
            </div>
        </Card>
    );
}

export default Item;
