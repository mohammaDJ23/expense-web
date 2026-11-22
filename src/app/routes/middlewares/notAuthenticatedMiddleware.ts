import { isAxiosError } from 'axios';
import { redirect, type MiddlewareFunction } from 'react-router';

import { findMe, getFindMeQueryOptions } from '@/api/orval/generated/endpoints/user';
import { queryClient } from '@/app/providers/QueryProvider';

export const notAuthenticatedMiddleware: MiddlewareFunction = async (_, next) => {
    try {
        const request = await queryClient.query({
            ...getFindMeQueryOptions(),
            queryFn: () => findMe(),
            staleTime: 0,
            gcTime: 0,
        });

        const isNotAuthenticated = !request.data?.data?.id && request.status === 401;

        if (isNotAuthenticated) {
            return await next();
        }

        return redirect('/');
    } catch (error) {
        if (isAxiosError(error) && error.status === 401) {
            return next();
        }

        throw error;
    }
};
