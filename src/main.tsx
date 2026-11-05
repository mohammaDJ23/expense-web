import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const element = document.getElementById('root');

if (!element) {
    throw new Error('No root element found to render the app');
}

createRoot(element).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
