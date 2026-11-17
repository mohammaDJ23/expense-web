import MenuIcon from './MenuIcon';
import ThemeIcon from './ThemeIcon';

import type { ReactElement } from 'react';

function MainHeader(): ReactElement {
    return (
        <header className="sticky top-0 z-30 flex h-15 shrink-0 items-center justify-between border-b border-border bg-surface px-4 overflow-hidden">
            <div className="flex w-full gap-4 items-center justify-between">
                <MenuIcon />
                <div className="flex items-center gap-4 w-full justify-end">
                    <ThemeIcon />
                </div>
            </div>
        </header>
    );
}

export default MainHeader;
