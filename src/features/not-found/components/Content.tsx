import { useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router';

import Button from '@/features/shared/components/atoms/Button';
import Typography from '@/features/shared/components/atoms/Typography';

function Content(): ReactElement {
    const navigate = useNavigate();

    const onButtonClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <div className="flex flex-col gap-5 items-center">
                <Typography variant="heading-1" className="text-primary">
                    404
                </Typography>
                <div className="flex flex-col gap-2">
                    <Typography variant="heading-3">Page not found</Typography>
                    <Typography>
                        The page you're looking for doesn't exist or has been moved.
                    </Typography>
                </div>
                <Button onClick={onButtonClick}>Back to home</Button>
            </div>
        </main>
    );
}

export default Content;
