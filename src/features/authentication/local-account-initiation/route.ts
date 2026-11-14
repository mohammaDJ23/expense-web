import type { RouteObject } from 'react-router';

export const localAccountInitiationRoute: RouteObject = {
    path: 'local-account-initiation',
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
