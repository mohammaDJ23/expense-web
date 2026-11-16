import type { RouteObject } from 'react-router';

export const notFoundRoute: RouteObject = {
    path: '*',
    lazy: async () => {
        const { default: Page } = await import('@/features/not-found/Page');

        return { Component: Page };
    },
};
