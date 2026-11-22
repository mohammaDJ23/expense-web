import { cx, tv, type VariantProps } from 'tailwind-variants';

import Icon from './Icon';
import Typography from './Typography';

import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef, PropsWithChildren, ReactElement } from 'react';

const badgeVariants = tv({
    slots: {
        base: 'flex w-fit items-center gap-2 rounded-md px-2 py-1',
        text: '',
        icon: 'shrink-0 cursor-pointer',
    },
    variants: {
        variant: {
            default: {
                base: 'bg-surface-secondary',
                text: 'text-text-secondary',
                icon: 'text-text-secondary',
            },
            success: {
                base: 'bg-success-background',
                text: 'text-success',
                icon: 'text-success',
            },
            error: {
                base: 'bg-error-background',
                text: 'text-error',
                icon: 'text-error',
            },
            warning: {
                base: 'bg-warning-background',
                text: 'text-warning',
                icon: 'text-warning',
            },
            info: {
                base: 'bg-info-background',
                text: 'text-info',
                icon: 'text-info',
            },
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface IProps
    extends
        ComponentPropsWithoutRef<'span'>,
        VariantProps<typeof badgeVariants>,
        PropsWithChildren {
    icon?: LucideIcon;
    onIconClick?(): void;
}

function Badge({
    children,
    variant,
    className,
    onIconClick = () => {},
    icon,
    ...props
}: Readonly<IProps>): ReactElement {
    const styles = badgeVariants({ variant });

    return (
        <div className={cx(styles.base(), className)} {...props}>
            <Typography variant="caption" className={styles.text()}>
                {children}
            </Typography>
            {icon && (
                <Icon
                    onClick={() => onIconClick()}
                    className={styles.icon()}
                    icon={icon}
                    size="14px"
                />
            )}
        </div>
    );
}

export default Badge;
