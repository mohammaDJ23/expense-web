import { Outlet } from 'react-router';

import Typography from '@/features/shared/components/atoms/Typography';

import type { ReactElement } from 'react';

function AuthenticationLayout(): ReactElement {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                <div className="mb-8 flex items-center justify-center gap-2">
                    <Typography variant="heading-2">Expense App</Typography>
                </div>
                <Outlet />
            </div>
            <footer className="mt-8">
                <Typography variant="caption" className="text-center ">
                    © {new Date().getFullYear()} Expense App. All rights reserved.
                </Typography>
            </footer>
        </main>
    );
}

export default AuthenticationLayout;
