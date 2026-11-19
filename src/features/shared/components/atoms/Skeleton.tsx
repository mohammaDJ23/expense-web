import { cx } from 'tailwind-variants';

import type { ComponentPropsWithoutRef, ReactElement } from 'react';

interface IProps extends ComponentPropsWithoutRef<'div'> {}

function Skeleton({ className, ...props }: Readonly<IProps>): ReactElement {
    return <div className={cx('animate-pulse rounded-2xl bg-disabled', className)} {...props} />;
}

export default Skeleton;
