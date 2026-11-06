import path from 'node:path';
import { fileURLToPath } from 'node:url';

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import securityPlugin from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export default defineConfig([
    {
        ignores: [
            'dist/',
            'node_modules/',
            '.env',
            '.env.*',
            '.vscode/',
            '*.md',
            '!README.md',
            '*.json',
            '*.yml',
            '*.yaml',
            'tsconfig.json',
            'tsconfig.*.json',
            'pnpm-lock.yaml',
            'eslint.config.mjs',
            'commitlint.config.js',
            'lint-staged.config.js',
            'orval.config.ts',
            'src/api/orval/generated/**/*.ts',
        ],
    },
    eslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: path.join(_dirname, 'tsconfig.eslint.json'),
                tsconfigRootDir: _dirname,
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: false,
            },
            globals: {
                ...globals.browser,
                ...globals.es2022,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.es2022,
            },
        },
    },
    {
        files: ['vite.config.ts', 'vite.config.*.ts', 'orval.config.ts', 'orval.config.*.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2022,
            },
        },
    },
    {
        files: ['**/*.{ts,tsx,js,mjs}'],
        plugins: {
            'import-x': importPlugin,
        },
        rules: {
            'import-x/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'react-dom',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'react-dom/**',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['type'],
                    distinctGroup: false,
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    'newlines-between': 'always',
                },
            ],
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['../*'],
                            message: 'Use @/* imports instead of relative imports',
                        },
                        {
                            group: ['./*/*'],
                            message:
                                'Use @/* imports for nested files, only allow direct ./ imports',
                        },
                    ],
                },
            ],
            'import-x/no-relative-parent-imports': [
                'error',
                {
                    ignore: ['@/*'],
                },
            ],
            'import-x/no-relative-packages': 'error',
            'import-x/no-duplicates': 'error',
            'import-x/no-cycle': 'off',
            'import-x/no-default-export': 'off',
            'import-x/no-named-as-default': 'error',
            'import-x/no-unresolved': 'error',
            'import-x/no-absolute-path': 'error',
            'import-x/namespace': 'off',
            'import-x/no-commonjs': 'error',
            'import-x/no-amd': 'error',
            'import-x/no-nodejs-modules': 'off',
            'import-x/no-deprecated': 'warn',
            'import-x/no-mutable-exports': 'error',
            'import-x/no-internal-modules': 'off',
            'import-x/no-unassigned-import': 'off',
            'import-x/no-webpack-loader-syntax': 'error',
        },
        settings: {
            'import-x/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import-x/resolver': {
                typescript: {
                    project: path.join(_dirname, 'tsconfig.eslint.json'),
                    alwaysTryTypes: true,
                },
                node: true,
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        plugins: {
            sonarjs,
        },
        rules: {
            ...sonarjs.configs.recommended.rules,
            'sonarjs/cognitive-complexity': ['error', 15],
            'sonarjs/no-duplicate-string': 'error',
            'sonarjs/no-all-duplicated-branches': 'error',
            'sonarjs/no-identical-functions': 'error',
            'sonarjs/no-small-switch': 'error',
            'sonarjs/no-use-of-empty-return-value': 'error',
            'sonarjs/prefer-immediate-return': 'error',
            'sonarjs/prefer-single-boolean-return': 'error',
            'sonarjs/no-os-command-from-path': 'error',
            'sonarjs/no-ignored-exceptions': 'error',
            'sonarjs/no-invariant-returns': 'off',
            'sonarjs/no-empty-collection': 'error',
            'sonarjs/no-redundant-boolean': 'error',
            'sonarjs/no-ignored-return': 'error',
        },
    },
    {
        plugins: {
            security: securityPlugin,
        },
        rules: {
            'security/detect-object-injection': 'error',
            'security/detect-unsafe-regex': 'error',
            'security/detect-buffer-noassert': 'error',
            'security/detect-child-process': 'error',
            'security/detect-disable-mustache-escape': 'error',
            'security/detect-eval-with-expression': 'error',
            'security/detect-no-csrf-before-method-override': 'error',
            'security/detect-non-literal-fs-filename': 'off',
            'security/detect-non-literal-regexp': 'off',
            'security/detect-non-literal-require': 'error',
            'security/detect-pseudoRandomBytes': 'error',
            'security/detect-possible-timing-attacks': 'error',
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
            ],
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unnecessary-type-assertion': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-base-to-string': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/method-signature-style': 'off',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/prefer-reduce-type-parameter': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/require-await': 'error',
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                { allowNumber: true, allowBoolean: true },
            ],
            '@typescript-eslint/no-unnecessary-type-constraint': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'error',
            '@typescript-eslint/no-meaningless-void-operator': 'error',
            '@typescript-eslint/no-extraneous-class': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unnecessary-type-parameters': 'off',
            '@typescript-eslint/no-useless-constructor': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'class',
                    format: ['PascalCase'],
                },
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    prefix: ['I'],
                },
                {
                    selector: 'enum',
                    format: ['PascalCase'],
                },
                {
                    selector: 'typeAlias',
                    format: ['PascalCase'],
                    prefix: ['T'],
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'function',
                    format: ['camelCase', 'PascalCase'],
                },
                {
                    selector: 'parameter',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                },
            ],
        },
    },
    {
        files: ['**/*.{ts,tsx,js,mjs}'],
        rules: {
            'no-console': ['error', { allow: ['warn', 'error', 'log', 'info'] }],
            'no-debugger': 'error',
            'no-alert': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-template': 'error',
            'object-shorthand': 'error',
            'no-useless-return': 'error',
            'no-useless-concat': 'error',
            'no-throw-literal': 'error',
            'no-self-compare': 'error',
            'no-param-reassign': 'off',
            'no-else-return': ['error', { allowElseIf: false }],
            'no-implicit-coercion': 'error',
            'no-lonely-if': 'error',
            'no-unneeded-ternary': 'error',
            'no-nested-ternary': 'error',
            'no-magic-numbers': 'off',
            'max-depth': ['error', 4],
            'max-lines': ['error', { max: 500, skipBlankLines: true }],
            'max-lines-per-function': ['error', { max: 150 }],
            'max-params': 'off',
            complexity: ['error', 15],
            'consistent-return': 'error',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            'default-case': 'error',
            'default-case-last': 'error',
            'dot-notation': 'error',
            'guard-for-in': 'error',
            'no-empty-function': 'off',
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-invalid-this': 'error',
            'no-iterator': 'error',
            'no-labels': 'error',
            'no-lone-blocks': 'error',
            'no-multi-str': 'error',
            'no-new': 'error',
            'no-new-func': 'error',
            'no-new-wrappers': 'error',
            'no-octal-escape': 'error',
            'no-proto': 'error',
            'no-return-assign': 'error',
            'no-return-await': 'error',
            'no-script-url': 'error',
            'no-self-assign': 'error',
            'no-sequences': 'error',
            'no-unused-expressions': 'error',
            'no-useless-call': 'error',
            'no-useless-catch': 'error',
            'no-useless-escape': 'error',
            'no-void': 'error',
            'prefer-promise-reject-errors': 'error',
            radix: 'error',
            'require-await': 'error',
            'wrap-iife': 'error',
            yoda: 'error',
            'no-await-in-loop': 'off',
            'no-promise-executor-return': 'error',
            'require-atomic-updates': 'error',
            'no-unreachable-loop': 'error',
            'no-constructor-return': 'error',
            'no-duplicate-imports': 'error',
            'no-useless-backreference': 'error',
            'no-empty': 'off',
        },
    },
    eslintPluginPrettierRecommended,
]);
