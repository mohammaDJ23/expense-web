import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string().regex(
        // eslint-disable-next-line security/detect-unsafe-regex, sonarjs/regex-complexity
        /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
        'Invalid email',
    ),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
