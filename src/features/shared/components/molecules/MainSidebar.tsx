import { Fragment, useState, type ReactElement } from 'react';
import {
    ContactRound,
    HandCoins,
    LayoutDashboard,
    MapPin,
    MapPinPlus,
    Receipt,
    ReceiptText,
    Search,
    UserRoundPlus,
    Users,
    Wallet,
    WalletCards,
    type LucideIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cx } from 'tailwind-variants';

import { useFindMe } from '@/api/orval/generated/endpoints/user';
import AppName from '@/features/shared/components/atoms/AppName';
import Icon from '@/features/shared/components/atoms/Icon';
import Image from '@/features/shared/components/atoms/Image';
import Typography from '@/features/shared/components/atoms/Typography';
import { UserRoles } from '@/features/shared/enums/userRole';

interface INavigationItem {
    label: string;
    path: string;
    icon: LucideIcon;
    role?: UserRoles;
}

interface IProps {
    onItemClick?(): void;
}

const NAVIGATIEON_ITEMS: INavigationItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Bills', path: '/bills', icon: Receipt },
    { label: 'Create Bill', path: '/bills/create', icon: ReceiptText },
    { label: 'Consumers', path: '/consumers', icon: ContactRound },
    { label: 'Create Consumer', path: '/consumers/create', icon: UserRoundPlus },
    { label: 'Locations', path: '/locations', icon: MapPin },
    { label: 'Create Location', path: '/locations/create', icon: MapPinPlus },
    { label: 'Receivers', path: '/receivers', icon: HandCoins },
    { label: 'Create Receiver', path: '/receivers/create', icon: WalletCards },
    { label: 'Users', path: '/users', icon: Users, role: UserRoles.OWNER },
    { label: 'Search', path: '/search', icon: Search },
];

function MainSidebar({ onItemClick = () => {} }: Readonly<IProps>): ReactElement {
    const location = useLocation();

    const [activePath, setActivePath] = useState<string>(location.pathname);

    const findMeRequest = useFindMe();

    const onNavigationClick = (item: INavigationItem) => {
        setActivePath(item.path);

        onItemClick();
    };

    const id = findMeRequest.data?.data?.data?.id;
    const role = findMeRequest.data?.data?.data?.role;
    const firstName = findMeRequest.data?.data?.data?.firstName;
    const lastName = findMeRequest.data?.data?.data?.lastName;
    const avatar = findMeRequest.data?.data?.data?.avatar;
    const name = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || null;

    return (
        <aside className="flex h-dvh shrink-0 flex-col border-r border-border bg-surface overflow-hidden">
            <div className="flex h-15 shrink-0 items-center gap-4 border-b border-border px-4 overflow-hidden">
                <Icon icon={Wallet} fill="currentColor" className="text-primary" />
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
                                'overflow-hidden group flex items-center gap-4 rounded-xl px-4 py-2 transition-colors hover:bg-success-background',
                                activePath === item.path && 'bg-success-background',
                            )}
                        >
                            <Icon
                                icon={item.icon}
                                fill={activePath === item.path ? 'currentColor' : 'none'}
                                className={cx(
                                    'group-hover:text-primary',
                                    activePath === item.path && 'text-primary',
                                )}
                            />
                            <Typography
                                className={cx(
                                    'group-hover:text-primary truncate',
                                    activePath === item.path && 'text-primary',
                                )}
                            >
                                {item.label}
                            </Typography>
                        </Link>
                    ) : (
                        <Fragment key={item.path}></Fragment>
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
