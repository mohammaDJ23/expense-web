import { Outlet, useNavigation } from 'react-router';

import MainHeader from '@/features/shared/components/molecules/MainHeader';
import MainSidebar from '@/features/shared/components/molecules/MainSidebar';
import SpinnerPage from '@/features/shared/components/molecules/SpinnerPage';

import type { ReactElement } from 'react';

function MainLayout(): ReactElement {
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <SpinnerPage />;
    }

    return (
        <div className="flex min-h-dvh w-full bg-background">
            <div className="hidden md:block">
                <MainSidebar />
            </div>
            <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
                <MainHeader />
                <main className="min-w-0 flex-1 bg-background p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
