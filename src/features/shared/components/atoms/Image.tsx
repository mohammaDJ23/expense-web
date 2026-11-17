import type { ComponentPropsWithoutRef, ReactElement } from 'react';

interface IProps extends ComponentPropsWithoutRef<'img'> {}

function Image(props: Readonly<IProps>): ReactElement {
    return <img loading="lazy" {...props} />;
}

export default Image;
