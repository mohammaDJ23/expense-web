import type { RouteObject } from 'react-router';

export const dashboardRoute: RouteObject = {
    lazy: async () => {
        const { default: Page } = await import('@/app/layouts/MainLayout');

        return { Component: Page };
    },
    children: [
        {
            path: 'dashboard',
            lazy: async () => {
                const { default: Page } = await import('./Page');

                return { Component: Page };
            },
        },
    ],
};
