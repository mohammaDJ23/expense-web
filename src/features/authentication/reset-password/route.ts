import type { RouteObject } from 'react-router';

export const resetPasswordRoute: RouteObject = {
    path: 'reset-password',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
