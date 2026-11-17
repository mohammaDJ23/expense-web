import { Grip } from 'lucide-react';

import type { ReactElement } from 'react';

function MainHeader(): ReactElement {
    return (
        <header className="sticky top-0 z-30 flex h-15 shrink-0 items-center justify-between border-b border-border bg-surface px-4">
            <div className="flex w-full gap-4 items-center justify-between md:hidden">
                <Grip className="shrink-0 cursor-pointer" />
                <div className="flex items-center gap-4 w-full"></div>
            </div>
        </header>
    );
}

export default MainHeader;
