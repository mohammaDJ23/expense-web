import AppProvider from '@/app/providers/AppProvider';
import RouterProvider from '@/app/providers/RouterProvider';

import type { ReactElement } from 'react';

function App(): ReactElement {
    return (
        <AppProvider>
            <RouterProvider />
        </AppProvider>
    );
}

export default App;
