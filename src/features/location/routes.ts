import { authenticatedMiddleware } from '@/app/routes/middlewares/authenticatedMiddleware';
import { createRoute } from '@/features/location/create/route';

import type { RouteObject } from 'react-router';

export const locationRoutes: RouteObject = {
    path: 'locations',
    middleware: [authenticatedMiddleware],
    lazy: async () => {
        const { default: Page } = await import('@/app/layouts/MainLayout');

        return { Component: Page };
    },
    children: [createRoute],
};
