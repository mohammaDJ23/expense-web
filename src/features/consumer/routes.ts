import { authenticatedMiddleware } from '@/app/routes/middlewares/authenticatedMiddleware';
import { createRoute } from '@/features/consumer/create/route';
import { listRoute } from '@/features/consumer/list/route';

import type { RouteObject } from 'react-router';

export const consumerRoutes: RouteObject = {
    path: 'consumers',
    middleware: [authenticatedMiddleware],
    lazy: async () => {
        const { default: Page } = await import('@/app/layouts/MainLayout');

        return { Component: Page };
    },
    children: [listRoute, createRoute],
};
