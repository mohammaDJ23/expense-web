import { Fragment, useState, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router';
import { cx } from 'tailwind-variants';

import { useFindMe } from '@/api/orval/generated/endpoints/user';
import AppName from '@/features/shared/components/atoms/AppName';
import Image from '@/features/shared/components/atoms/Image';
import Typography from '@/features/shared/components/atoms/Typography';
import { UserRoles } from '@/features/shared/enums/userRole';

interface INavigationItem {
    label: string;
    path: string;
    role?: UserRoles;
}

const NAVIGATIEON_ITEMS: INavigationItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Bills', path: '/bills' },
    { label: 'Create Bill', path: '/bills/create' },
    { label: 'Consumers', path: '/consumers' },
    { label: 'Create Consumer', path: '/consumers/create' },
    { label: 'Locations', path: '/locations' },
    { label: 'Create Location', path: '/locations/create' },
    { label: 'Receivers', path: '/receivers' },
    { label: 'Create Receiver', path: '/receivers/create' },
    { label: 'Users', path: '/Users', role: UserRoles.OWNER },
];

function MainSidebar(): ReactElement {
    const location = useLocation();

    const [activePath, setActivePath] = useState<string>(location.pathname);

    const findMeRequest = useFindMe();

    const onNavigationClick = (item: INavigationItem) => {
        setActivePath(item.path);
    };

    const id = findMeRequest.data?.data?.data?.id;
    const role = findMeRequest.data?.data?.data?.role;
    const firstName = findMeRequest.data?.data?.data?.firstName;
    const lastName = findMeRequest.data?.data?.data?.lastName;
    const avatar = findMeRequest.data?.data?.data?.avatar;
    const name = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || null;

    return (
        <aside className="flex h-dvh w-60 shrink-0 flex-col border-r border-border bg-surface">
            <div className="flex h-19 shrink-0 items-center justify-between border-b border-border px-4">
                <AppName />
            </div>
            <nav className="flex-1 flex flex-col gap-2 overflow-y-auto p-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {NAVIGATIEON_ITEMS.map((item) =>
                    !item?.role || role === item?.role ? (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => onNavigationClick(item)}
                            className={cx(
                                'group flex items-center gap-4 rounded-xl px-4 py-2 transition-colors hover:bg-success-background',
                                activePath === item.path && 'bg-success-background',
                            )}
                        >
                            <Typography
                                className={cx(
                                    'group-hover:text-success',
                                    activePath === item.path && 'text-success',
                                )}
                            >
                                {item.label}
                            </Typography>
                        </Link>
                    ) : (
                        <Fragment></Fragment>
                    ),
                )}
            </nav>
            {(name || avatar) && (
                <div className="shrink-0 border-t border-border p-4">
                    <div className="flex shrink-0 items-center gap-3">
                        <Link
                            to={id ? `/users/${id}` : location.pathname}
                            className="flex size-10 items-center justify-center rounded-full bg-background overflow-hidden"
                        >
                            {avatar ? (
                                <Image src={avatar} alt="avatar" className="bg-background" />
                            ) : (
                                name && <Typography>{name}</Typography>
                            )}
                        </Link>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default MainSidebar;
