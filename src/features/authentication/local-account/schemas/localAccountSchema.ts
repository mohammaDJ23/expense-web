import { z } from 'zod';

export const localAccountSchema = z.object({
    password: z.string().regex(
        // eslint-disable-next-line sonarjs/concise-regex
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,45}$/,
        'The password should be strong',
    ),
    token: z.jwt(),
});

export type TLocalAccountSchema = z.infer<typeof localAccountSchema>;
