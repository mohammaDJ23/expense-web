import type { RouteObject } from 'react-router';

export const forgotPasswordRoute: RouteObject = {
    path: 'forgot-password',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
