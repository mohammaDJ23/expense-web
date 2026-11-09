import AppProvider from '@/app/providers/AppProvider';

import type { ReactElement } from 'react';

function App(): ReactElement {
    return (
        <AppProvider>
            <div>Hi there</div>
        </AppProvider>
    );
}

export default App;
