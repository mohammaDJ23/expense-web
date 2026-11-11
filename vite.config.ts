import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 9595,
        strictPort: true,
    },
    preview: {
        port: 9595,
        strictPort: true,
    },
    resolve: {
        tsconfigPaths: true,
    },
});
