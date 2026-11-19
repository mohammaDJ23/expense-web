import { cx } from 'tailwind-variants';

import type { ComponentPropsWithoutRef, PropsWithChildren, ReactElement } from 'react';

interface IProps extends PropsWithChildren, ComponentPropsWithoutRef<'div'> {}

function Card({ children, className, ...props }: Readonly<IProps>): ReactElement {
    return (
        <div
            className={cx(
                'p-4 bg-surface border border-border shadow-xs rounded-2xl size-full overflow-hidden',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export default Card;
