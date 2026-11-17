import { isAxiosError } from 'axios';
import { redirect, type MiddlewareFunction } from 'react-router';

import { getFindMeQueryOptions } from '@/api/orval/generated/endpoints/user';
import { queryClient } from '@/app/providers/QueryProvider';

export const authenticatedMiddleware: MiddlewareFunction = async (_, next) => {
    try {
        const request = await queryClient.query({
            ...getFindMeQueryOptions(),
            staleTime: 0,
            gcTime: 0,
        });

        const isAuthenticated = Boolean(request.data?.data?.id) && request.status !== 401;

        if (isAuthenticated) {
            return await next();
        }

        return redirect('/authentication/login');
    } catch (error) {
        if (isAxiosError(error) && error.status === 401) {
            return redirect('/authentication/login');
        }

        throw error;
    }
};
