import { createBrowserRouter } from 'react-router';

import { authenticationRoutes } from '@/features/authentication/routes';
import PageSpinner from '@/features/shared/components/molecules/PageSpinner';

export const router = createBrowserRouter([
    {
        HydrateFallback: PageSpinner,
        children: [authenticationRoutes],
    },
    {
        path: '*',
        HydrateFallback: PageSpinner,
        lazy: async () => {
            const { default: Page } = await import('@/features/not-found/Page');

            return { Component: Page };
        },
    },
]);
