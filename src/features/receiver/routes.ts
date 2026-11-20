import { authenticatedMiddleware } from '@/app/routes/middlewares/authenticatedMiddleware';
import { createRoute } from '@/features/receiver/create/route';

import type { RouteObject } from 'react-router';

export const receiverRoutes: RouteObject = {
    path: 'receivers',
    middleware: [authenticatedMiddleware],
    lazy: async () => {
        const { default: Page } = await import('@/app/layouts/MainLayout');

        return { Component: Page };
    },
    children: [createRoute],
};
