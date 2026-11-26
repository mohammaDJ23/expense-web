import type { RouteObject } from 'react-router';

export const itemRoute: RouteObject = {
    path: ':id',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
