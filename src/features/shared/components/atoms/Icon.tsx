import { cx } from 'tailwind-variants';

import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

interface IProps extends ComponentPropsWithoutRef<LucideIcon> {
    icon: LucideIcon;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function Icon({ icon: Icon, className, ...props }: Readonly<IProps>): ReactElement {
    return <Icon {...props} className={cx('body-text', className)} />;
}

export default Icon;
