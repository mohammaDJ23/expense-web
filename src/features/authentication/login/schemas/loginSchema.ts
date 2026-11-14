import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().regex(
        // eslint-disable-next-line security/detect-unsafe-regex, sonarjs/regex-complexity
        /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
        'Invalid email',
    ),
    password: z.string().regex(
        // eslint-disable-next-line sonarjs/concise-regex
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,45}$/,
        'The password should be strong',
    ),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
