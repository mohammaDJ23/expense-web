import { z } from 'zod';

export const localAccountInitiationSchema = z.object({
    email: z.string().regex(
        // eslint-disable-next-line security/detect-unsafe-regex, sonarjs/regex-complexity
        /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
        'Invalid email',
    ),
});

export type TLocalAccountInitiationSchema = z.infer<typeof localAccountInitiationSchema>;
