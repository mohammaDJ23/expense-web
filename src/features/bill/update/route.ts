import type { RouteObject } from 'react-router';

export const updateRoute: RouteObject = {
    path: 'update/:id',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
