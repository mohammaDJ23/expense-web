import { defineConfig } from 'orval';

export default defineConfig({
    api: {
        input: {
            target: './backend-apis.json',
        },
        output: {
            mode: 'tags',
            target: './src/api/orval/generated/endpoints',
            schemas: './src/api/orval/generated/models',
            client: 'react-query',
            httpClient: 'axios',
            clean: true,
            override: {
                mutator: {
                    path: './src/api/orval/mutator/custom-instance.ts',
                    name: 'customInstance',
                },
            },
        },
    },
});
