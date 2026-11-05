const esLintCommand = 'pnpm exec eslint --fix';
const prettierCommand = 'pnpm exec prettier --write';

module.exports = {
    '*.{js,jsx,ts,tsx,yml,yaml}': [esLintCommand, prettierCommand],
    '*.css': [esLintCommand, prettierCommand],
    '*.json': [esLintCommand, prettierCommand],
    '*.md': [prettierCommand],
};
