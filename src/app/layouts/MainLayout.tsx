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
        <div className="flex h-dvh w-full overflow-hidden bg-background">
            <div className="hidden h-full w-60 shrink-0 md:block">
                <MainSidebar />
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="shrink-0">
                    <MainHeader />
                </div>
                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-background p-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
