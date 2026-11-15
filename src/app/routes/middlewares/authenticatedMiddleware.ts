import { redirect, type MiddlewareFunction } from 'react-router';

import { getFindMeQueryOptions } from '@/api/orval/generated/endpoints/user';
import { queryClient } from '@/app/providers/queryProviderConstants';

export const authenticatedMiddleware: MiddlewareFunction = async (_, next) => {
    const request = await queryClient.query({
        ...getFindMeQueryOptions(),
        staleTime: 0,
        gcTime: 0,
    });

    const isAuthenticated = Boolean(request.data?.data?.id) && request.status !== 401;

    if (isAuthenticated) {
        return next();
    }

    return redirect('/authentication/login');
};
