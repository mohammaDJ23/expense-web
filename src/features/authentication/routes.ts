import { signupInitiationRoute } from '@/features/authentication/signup-initiation/route';

import type { RouteObject } from 'react-router';

export const authenticationRoutes: RouteObject = {
    path: 'authentication',
    children: [signupInitiationRoute],
};
