import type { RouteObject } from 'react-router';

export const localAccountRoute: RouteObject = {
    path: 'local-account',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
