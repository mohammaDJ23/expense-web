import { createBrowserRouter } from 'react-router';

import { authenticationRoutes } from '@/features/authentication/routes';
import PageSpinner from '@/features/shared/components/molecules/PageSpinner';

export const router = createBrowserRouter([
    {
        HydrateFallback: PageSpinner,
        children: [authenticationRoutes],
    },
]);
