import { createBrowserRouter } from 'react-router';

import { authenticationRoutes } from '@/features/authentication/routes';
import { notFoundRoute } from '@/features/not-found/route';
import ErrorPage from '@/features/shared/components/molecules/ErrorPage';
import PageSpinner from '@/features/shared/components/molecules/PageSpinner';

export const router = createBrowserRouter([
    {
        HydrateFallback: PageSpinner,
        ErrorBoundary: ErrorPage,
        children: [authenticationRoutes, notFoundRoute],
    },
]);
