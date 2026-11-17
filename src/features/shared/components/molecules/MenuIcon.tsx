import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { Menu } from 'lucide-react';
import { cx } from 'tailwind-variants';

import Icon from '@/features/shared/components/atoms/Icon';
import { DESKTOP_MEDIA_QUERY } from '@/features/shared/constants';
import { useMediaQuery } from '@/features/shared/hooks/useMediaQuery';

import MainSidebar from './MainSidebar';

function MenuIcon(): ReactElement {
    const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isDesktop) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsOpen(false);
        }
    }, [isDesktop]);

    const openMenu = useCallback((): void => {
        requestAnimationFrame(() => setIsOpen(true));
    }, []);

    const closeMenu = useCallback((): void => {
        requestAnimationFrame(() => setIsOpen(false));
    }, []);

    return (
        <>
            <Icon icon={Menu} className="shrink-0 cursor-pointer md:hidden" onClick={openMenu} />
            <div
                onClick={closeMenu}
                aria-hidden={!isOpen}
                className={cx(
                    'fixed inset-0 z-40 bg-overlay transition-opacity duration-300 md:hidden',
                    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
            />
            <div
                className={cx(
                    'fixed inset-y-0 left-0 top-0 z-50 w-60 transition-transform duration-300 ease-in-out md:hidden',
                    isOpen ? 'translate-x-0' : 'pointer-events-none -translate-x-full',
                )}
            >
                <MainSidebar onItemClick={closeMenu} />
            </div>
        </>
    );
}

export default MenuIcon;
