import { ErrorBoundary } from 'react-error-boundary';

import AppProvider from '@/app/providers/AppProvider';
import RouterProvider from '@/app/providers/RouterProvider';
import ErrorPage from '@/features/shared/components/molecules/ErrorPage';

import type { ReactElement } from 'react';

function App(): ReactElement {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <AppProvider>
                <RouterProvider />
            </AppProvider>
        </ErrorBoundary>
    );
}

export default App;
