import { useCallback, type ReactElement } from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router';

import Card from '@/features/shared/components/atoms/Card';
import Icon from '@/features/shared/components/atoms/Icon';
import Typography from '@/features/shared/components/atoms/Typography';

import type { LocationResponseDto } from '@/api/orval/generated/models';

interface IProps extends LocationResponseDto {}

function Item({ id, name, createdAt }: Readonly<IProps>): ReactElement {
    const navigate = useNavigate();

    const onLocationClick = useCallback(() => {
        navigate(`/locations/${id}`);
    }, [navigate, id]);

    return (
        <Card className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-between gap-4 truncate flex-1">
                <Typography variant="heading-4">{name}</Typography>
                <Typography variant="caption" className="shrink-0">
                    {new Date(createdAt).toLocaleDateString()}
                </Typography>
            </div>
            <Icon
                onClick={onLocationClick}
                className="shrink-0 cursor-pointer"
                icon={Info}
                size="18px"
            />
        </Card>
    );
}

export default Item;
