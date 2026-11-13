import type { RouteObject } from 'react-router';

export const loginRoute: RouteObject = {
    path: 'login',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
