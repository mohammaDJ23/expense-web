import ScrollContainer from 'react-indiana-drag-scroll';
import { cx } from 'tailwind-variants';

import type { ComponentPropsWithoutRef, ReactElement } from 'react';

interface IProps extends ComponentPropsWithoutRef<'div'> {}

function DragScroll({ children, className }: Readonly<IProps>): ReactElement {
    return (
        <ScrollContainer
            horizontal
            vertical={false}
            hideScrollbars
            activationDistance={10}
            className={cx(className)}
        >
            {children}
        </ScrollContainer>
    );
}

export default DragScroll;
