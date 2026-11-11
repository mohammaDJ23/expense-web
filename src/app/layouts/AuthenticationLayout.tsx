import { Outlet } from 'react-router';

import type { ReactElement } from 'react';

function AuthenticationLayout(): ReactElement {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
            <div className="mb-8 flex items-center gap-2">
                <p className="heading-2">Expense App</p>
            </div>
            <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                <Outlet />
            </div>
            <footer className="mt-8">
                <p className="text-center caption">
                    © {new Date().getFullYear()} Expense App. All rights reserved.
                </p>
            </footer>
        </main>
    );
}

export default AuthenticationLayout;
