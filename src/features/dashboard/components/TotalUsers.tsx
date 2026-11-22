import { useFindMe, useFindTotalUsers } from '@/api/orval/generated/endpoints/user';
import Card from '@/features/shared/components/atoms/Card';
import Skeleton from '@/features/shared/components/atoms/Skeleton';
import Typography from '@/features/shared/components/atoms/Typography';
import { UserRoles } from '@/features/shared/enums/userRole';
import { getApiResponse } from '@/features/shared/utils/getApiResponse';

import type { ReactNode } from 'react';

function TotalUsers(): ReactNode {
    const findMeRequest = useFindMe({
        query: {
            select: getApiResponse,
        },
    });
    const totalUsersRequest = useFindTotalUsers({
        query: {
            enabled: findMeRequest.data?.role === UserRoles.OWNER,
            select: getApiResponse,
        },
    });

    if (totalUsersRequest.isLoading) {
        return <Skeleton className="min-h-26 w-full" />;
    }

    if (totalUsersRequest.isError) {
        return (
            <Card className="min-h-26 flex flex-col items-center justify-center">
                <Typography className="text-center">Failed to load the total users</Typography>
            </Card>
        );
    }

    if (totalUsersRequest.isSuccess) {
        const total = totalUsersRequest.data.total;

        return (
            <Card className="min-h-26 flex flex-col justify-between">
                <Typography variant="heading-4">{total.toLocaleString()}</Typography>
                <Typography>Total users</Typography>
            </Card>
        );
    }

    return null;
}

export default TotalUsers;
