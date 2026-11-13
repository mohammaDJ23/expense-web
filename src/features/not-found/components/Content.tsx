import { useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router';

import Button from '@/features/shared/components/atoms/Button';

function Content(): ReactElement {
    const navigate = useNavigate();

    const onButtonClick = useCallback(() => {
        navigate('/dashboard');
    }, [navigate]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <div className="flex flex-col gap-5 items-center">
                <h1 className="heading-1 text-primary">404</h1>
                <div className="flex flex-col gap-2">
                    <p className="heading-3">Page not found</p>
                    <p className="text-caption">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <Button onClick={onButtonClick}>Back to dashboard</Button>
            </div>
        </main>
    );
}

export default Content;
