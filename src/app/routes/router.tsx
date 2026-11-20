import { createBrowserRouter, Navigate } from 'react-router';

import { authenticationRoutes } from '@/features/authentication/routes';
import { consumerRoutes } from '@/features/consumer/routes';
import { dashboardRoute } from '@/features/dashboard/route';
import { locationRoutes } from '@/features/location/routes';
import { notFoundRoute } from '@/features/not-found/route';
import { receiverRoutes } from '@/features/receiver/routes';
import ErrorPage from '@/features/shared/components/molecules/ErrorPage';
import SpinnerPage from '@/features/shared/components/molecules/SpinnerPage';

export const router = createBrowserRouter([
    {
        HydrateFallback: SpinnerPage,
        ErrorBoundary: ErrorPage,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            authenticationRoutes,
            dashboardRoute,
            locationRoutes,
            consumerRoutes,
            receiverRoutes,
            notFoundRoute,
        ],
    },
]);
