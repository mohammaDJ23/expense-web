import { createBrowserRouter } from 'react-router';

import { authenticationRoutes } from '@/features/authentication/routes';
import { notFoundRoute } from '@/features/not-found/route';
import ErrorPage from '@/features/shared/components/molecules/ErrorPage';
import SpinnerPage from '@/features/shared/components/molecules/SpinnerPage';

export const router = createBrowserRouter([
    {
        HydrateFallback: SpinnerPage,
        ErrorBoundary: ErrorPage,
        children: [authenticationRoutes, notFoundRoute],
    },
]);
