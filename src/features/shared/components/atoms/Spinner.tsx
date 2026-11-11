import { tv, type VariantProps, cx } from 'tailwind-variants/lite';

import type { ComponentPropsWithoutRef, ReactElement } from 'react';

const spinnerVariants = tv({
    base: 'inline-block shrink-0 animate-spin rounded-full border-primary/20 border-t-primary motion-reduce:animate-none',
    variants: {
        size: {
            sm: 'size-4 border-2',
            md: 'size-6 border-2',
            lg: 'size-8 border-[3px]',
            xl: 'size-10 border-[3px]',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

interface IProps extends ComponentPropsWithoutRef<'span'>, VariantProps<typeof spinnerVariants> {}

function Spinner({ size, className, ...props }: Readonly<IProps>): ReactElement {
    return (
        <span
            role="status"
            aria-label="Loading"
            {...props}
            className={cx(spinnerVariants({ size }), className)}
        />
    );
}

export default Spinner;
