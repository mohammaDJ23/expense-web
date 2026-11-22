import type { RouteObject } from 'react-router';

export const listRoute: RouteObject = {
    index: true,
    lazy: async () => {
        const { default: Page } = await import('./Page');

        return { Component: Page };
    },
};
