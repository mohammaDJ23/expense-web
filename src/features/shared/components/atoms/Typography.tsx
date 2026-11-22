import { cx, tv, type VariantProps } from 'tailwind-variants/lite';

import type { ComponentPropsWithoutRef, ReactElement } from 'react';

const typographyVariants = tv({
    base: 'm-0',
    variants: {
        variant: {
            'heading-1': 'heading-1',
            'heading-2': 'heading-2',
            'heading-3': 'heading-3',
            'heading-4': 'heading-4',
            subtitle: 'subtitle',
            'body-text': 'body-text',
            caption: 'caption',
        },
        truncate: {
            true: 'truncate',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'body-text',
        truncate: true,
    },
});

const typographyElements = {
    'heading-1': 'h1',
    'heading-2': 'h2',
    'heading-3': 'h3',
    'heading-4': 'h4',
    subtitle: 'p',
    'body-text': 'p',
    caption: 'span',
} as const;

type TElement = (typeof typographyElements)[keyof typeof typographyElements];

type TProps =
    | (Omit<ComponentPropsWithoutRef<'h1'>, 'color'> & VariantProps<typeof typographyVariants>)
    | (Omit<ComponentPropsWithoutRef<'p'>, 'color'> & VariantProps<typeof typographyVariants>)
    | (Omit<ComponentPropsWithoutRef<'span'>, 'color'> & VariantProps<typeof typographyVariants>);

function Typography({
    variant = 'body-text',
    as,
    className,
    children,
    truncate,
    ...props
}: Readonly<
    TProps & {
        as?: TElement;
    }
>): ReactElement {
    const Component = as ?? typographyElements[variant as keyof typeof typographyElements];

    return (
        <Component {...props} className={cx(typographyVariants({ variant, truncate }), className)}>
            {children}
        </Component>
    );
}

export default Typography;
