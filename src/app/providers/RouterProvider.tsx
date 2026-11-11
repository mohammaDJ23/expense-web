import { RouterProvider as RouterProviderBase } from 'react-router';

import { router } from '@/app/router';

import type { ReactElement } from 'react';

function RouterProvider(): ReactElement {
    return <RouterProviderBase router={router} />;
}

export default RouterProvider;
