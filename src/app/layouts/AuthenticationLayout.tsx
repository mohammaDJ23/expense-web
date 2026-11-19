import { Outlet, useNavigation } from 'react-router';

import Card from '@/features/shared/components/atoms/Card';
import Typography from '@/features/shared/components/atoms/Typography';
import SpinnerPage from '@/features/shared/components/molecules/SpinnerPage';

import type { ReactElement } from 'react';

function AuthenticationLayout(): ReactElement {
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <SpinnerPage />;
    }

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
            <Card className="max-w-md bg-surface p-6 sm:p-8">
                <div className="mb-8 flex items-center justify-center gap-2">
                    <Typography variant="heading-2">Expense App</Typography>
                </div>
                <Outlet />
            </Card>
            <footer className="mt-8">
                <Typography variant="caption" className="text-center ">
                    © {new Date().getFullYear()} Expense App. All rights reserved.
                </Typography>
            </footer>
        </main>
    );
}

export default AuthenticationLayout;
