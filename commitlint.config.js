const COMMITS = [
    'feature',
    'feat',
    'improvement',
    'enhancement',
    'optimization',
    'fix',
    'perf',
    'performance',
    'hotfix',
    'config',
    'security',
    'breaking',
    'docs',
    'readme',
    'style',
    'refactor',
    'test',
    'build',
    'ci',
    'cd',
    'chore',
    'revert',
    'rollback',
    'release',
];

export default {
    rules: {
        'commit-message-format': [2, 'always'],
    },
    plugins: [
        {
            rules: {
                'commit-message-format': ({ header }) => {
                    const COMMIT_MSG_REGEX = new RegExp(`^(${COMMITS.join('|')}):\\s+.+$`, 'i');

                    if (!COMMIT_MSG_REGEX.test(header)) {
                        return [
                            false,
                            `Commit message must follow the format: <type>: <description>\n` +
                                `Allowed types: ${COMMITS.join(', ')}\n` +
                                `Example: feat: add user authentication\n` +
                                `Your message: "${header}"`,
                        ];
                    }

                    return [true];
                },
            },
        },
    ],
};
