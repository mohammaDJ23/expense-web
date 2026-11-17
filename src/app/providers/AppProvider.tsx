import QueryProvider from './QueryProvider';
import ThemeProvider from './ThemeProvider';

import type { PropsWithChildren, ReactElement } from 'react';

interface IProps extends PropsWithChildren {}

function AppProvider({ children }: Readonly<IProps>): ReactElement {
    return (
        <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
    );
}

export default AppProvider;
