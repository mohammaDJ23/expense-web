import type { RouteObject } from 'react-router';

export const signupRoute: RouteObject = {
    path: 'signup',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
