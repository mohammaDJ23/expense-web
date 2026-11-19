import type { RouteObject } from 'react-router';

export const createRoute: RouteObject = {
    path: 'create',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
