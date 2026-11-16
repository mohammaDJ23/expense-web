import Spinner from '@/features/shared/components/atoms/Spinner';

import type { ReactElement } from 'react';

function SpinnerPage(): ReactElement {
    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen w-full">
            <Spinner size="lg" />
        </div>
    );
}

export default SpinnerPage;
