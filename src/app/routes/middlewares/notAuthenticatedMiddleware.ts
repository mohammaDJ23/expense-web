import { redirect, type MiddlewareFunction } from 'react-router';

import { getFindMeQueryOptions } from '@/api/orval/generated/endpoints/user';
import { queryClient } from '@/app/providers/queryProviderConstants';

export const notAuthenticatedMiddleware: MiddlewareFunction = async (_, next) => {
    const request = await queryClient.query({
        ...getFindMeQueryOptions(),
        staleTime: 0,
        gcTime: 0,
    });

    const isNotAuthenticated = !request.data?.data?.id && request.status === 401;

    if (isNotAuthenticated) {
        return next();
    }

    return redirect('/');
};
