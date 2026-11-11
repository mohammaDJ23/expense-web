import type { RouteObject } from 'react-router';

export const signupInitiationRoute: RouteObject = {
    path: 'signup-initiation',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
