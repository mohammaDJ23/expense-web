import { cx, tv, type VariantProps } from 'tailwind-variants/lite';

import type { ComponentPropsWithoutRef, ReactElement } from 'react';

const inputVariants = tv({
    slots: {
        wrapper: [
            'flex w-full items-center gap-2 rounded-lg border border-input-border bg-input px-3',
            'transition-all duration-150',
            'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15',
            'has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-disabled',
        ],
        input: [
            'w-full min-w-0 bg-transparent body-text outline-none',
            'placeholder:caption',
            'disabled:cursor-not-allowed disabled:caption',
        ],
    },
    variants: {
        size: {
            sm: {
                wrapper: 'h-9',
                input: 'text-caption',
            },
            md: {
                wrapper: 'h-11',
                input: 'text-body',
            },
            lg: {
                wrapper: 'h-12',
                input: 'text-body',
            },
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export interface IProps
    extends Omit<ComponentPropsWithoutRef<'input'>, 'size'>, VariantProps<typeof inputVariants> {}

export function Input({ size, className, ...props }: Readonly<IProps>): ReactElement {
    const { wrapper, input } = inputVariants({ size });

    return (
        <div className={cx(wrapper(), className)}>
            <input {...props} className={input()} />
        </div>
    );
}
