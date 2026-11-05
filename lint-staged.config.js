const esLintCommand = 'pnpm exec eslint --fix';
const prettierCommand = 'pnpm exec prettier --write';

export default {
    '*.{js,jsx,ts,tsx,yml,yaml}': [esLintCommand, prettierCommand],
    '*.css': [esLintCommand, prettierCommand],
    '*.json': [esLintCommand, prettierCommand],
    '*.md': [prettierCommand],
};
