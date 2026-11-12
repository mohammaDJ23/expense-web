import { cx, tv, type VariantProps } from 'tailwind-variants/lite';

import type { ComponentPropsWithoutRef, ReactElement } from 'react';

const buttonVariants = tv({
    base: [
        'inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden',
        'rounded-lg whitespace-wrap',
        'transition-colors duration-150',
        'cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
        'disabled:pointer-events-none disabled:opacity-50',
    ],
    variants: {
        variant: {
            primary: 'bg-primary text-white hover:bg-primary-hover',
            secondary: 'border border-border bg-surface text-text hover:bg-surface-secondary',
            outline: 'border border-primary text-primary hover:bg-primary/5',
            ghost: 'text-text-secondary hover:bg-surface-secondary hover:text-text',
            danger: 'bg-error text-white hover:bg-error/90',
        },
        size: {
            sm: 'px-3 py-1 caption',
            md: 'px-4 py-1.5 body-text',
            lg: 'px-5 py-2 subtitle',
        },
        fullWidth: {
            true: 'w-full',
            false: 'w-fit',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        fullWidth: false,
    },
});

interface IProps extends ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {}

function Button({
    variant,
    size,
    fullWidth,
    className,
    type = 'button',
    children,
    ...props
}: Readonly<IProps>): ReactElement {
    return (
        <button
            {...props}
            type={type}
            className={cx(buttonVariants({ variant, size, fullWidth }), className)}
        >
            {children}
        </button>
    );
}

export default Button;
