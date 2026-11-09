import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { PropsWithChildren, ReactElement } from 'react';

interface IProps extends PropsWithChildren {}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: 0,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 0,
        },
    },
});

function QueryProvider({ children }: Readonly<IProps>): ReactElement {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}

export default QueryProvider;
