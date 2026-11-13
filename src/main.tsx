import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/plus-jakarta-sans';

import App from '@/app/App.tsx';
import '@/app/index.css';

const element = document.getElementById('root');

if (!element) {
    throw new Error('No root element found to render the app');
}

createRoot(element).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
