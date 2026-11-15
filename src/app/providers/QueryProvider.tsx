import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from './queryProviderConstants';

import type { PropsWithChildren, ReactElement } from 'react';

interface IProps extends PropsWithChildren {}

function QueryProvider({ children }: Readonly<IProps>): ReactElement {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}

export default QueryProvider;
