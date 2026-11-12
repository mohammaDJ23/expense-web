import { cx, tv, type VariantProps } from 'tailwind-variants/lite';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

const messageVariants = tv({
    slots: {
        wrapper: 'flex items-start gap-3 rounded-lg py-2 px-3 overflow-hidden',
        content: 'min-w-0 flex-1',
        text: 'body-text',
    },
    variants: {
        variant: {
            success: {
                wrapper: 'bg-success-background',
                text: 'text-success',
            },
            error: {
                wrapper: 'bg-error-background',
                text: 'text-error',
            },
            warning: {
                wrapper: 'bg-warning-background',
                text: 'text-warning',
            },
            info: {
                wrapper: 'bg-info-background',
                text: 'text-info',
            },
        },
    },
    defaultVariants: {
        variant: 'info',
    },
});

interface IProps extends ComponentPropsWithoutRef<'div'>, VariantProps<typeof messageVariants> {
    message?: string;
}

function Message({ variant, message, className, ...props }: Readonly<IProps>): ReactNode {
    if (!message) {
        return null;
    }

    const { wrapper, content, text } = messageVariants({ variant });

    return (
        <div className={cx(wrapper(), className)} {...props}>
            <div className={content()}>
                <p className={text()}>{message}</p>
            </div>
        </div>
    );
}

export default Message;
