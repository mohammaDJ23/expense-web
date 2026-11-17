import AppName from '@/features/shared/components/atoms/AppName';
import Input from '@/features/shared/components/atoms/Input';

import type { ReactElement } from 'react';

function MainHeader(): ReactElement {
    return (
        <header className="sticky top-0 z-30 flex h-19 shrink-0 items-center justify-between border-b border-border bg-surface px-4">
            <div className="flex w-full gap-4 items-center md:hidden">
                <AppName />
            </div>
            <div className="hidden w-full items-center justify-center gap-12 md:flex">
                <div className="relative w-full max-w-xl">
                    <Input type="search" placeholder="Search..." className="bg-background!" />
                </div>
            </div>
        </header>
    );
}

export default MainHeader;
