import { useNavigate } from 'react-router';

import Button from '@/features/shared/components/atoms/Button';
import Typography from '@/features/shared/components/atoms/Typography';

import type { ReactElement } from 'react';

function ErrorPage(): ReactElement {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-screen  flex-col items-center justify-center bg-background p-4 text-center">
            <div className="flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-2 items-center">
                    <Typography variant="heading-2">Something went wrong</Typography>
                    <Typography variant="subtitle">
                        An unexpected error occurred. Please try again.
                    </Typography>
                </div>
                <Button onClick={() => navigate(0)}>Try again</Button>
            </div>
        </main>
    );
}

export default ErrorPage;
