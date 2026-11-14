import { forgotPasswordRoute } from '@/features/authentication/forgot-password/route';
import { localAccountInitiationRoute } from '@/features/authentication/local-account-initiation/route';
import { loginRoute } from '@/features/authentication/login/route';
import { resetPasswordRoute } from '@/features/authentication/reset-password/route';
import { signupRoute } from '@/features/authentication/signup/route';
import { signupInitiationRoute } from '@/features/authentication/signup-initiation/route';

import type { RouteObject } from 'react-router';

export const authenticationRoutes: RouteObject = {
    path: 'authentication',
    lazy: async () => {
        const { default: Page } = await import('@/app/layouts/AuthenticationLayout');

        return { Component: Page };
    },
    children: [
        signupInitiationRoute,
        signupRoute,
        loginRoute,
        forgotPasswordRoute,
        resetPasswordRoute,
        localAccountInitiationRoute,
    ],
};
