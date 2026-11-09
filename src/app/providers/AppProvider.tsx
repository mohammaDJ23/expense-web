import QueryProvider from './QueryProvider';

import type { PropsWithChildren, ReactElement } from 'react';

interface IProps extends PropsWithChildren {}

function AppProvider({ children }: Readonly<IProps>): ReactElement {
    return <QueryProvider>{children}</QueryProvider>;
}

export default AppProvider;
