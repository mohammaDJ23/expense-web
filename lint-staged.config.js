module.exports = {
    '*.{js,jsx,ts,tsx}': ['pnpm exec eslint --fix', 'pnpm exec prettier --write'],
    '*.{yml,yaml}': ['pnpm exec eslint --fix', 'pnpm exec prettier --write'],
    '*.css': ['pnpm exec eslint --fix', 'pnpm exec prettier --write'],
    '*.json': ['pnpm exec eslint --fix', 'pnpm exec prettier --write'],
    '*.md': ['pnpm exec prettier --write'],
};
