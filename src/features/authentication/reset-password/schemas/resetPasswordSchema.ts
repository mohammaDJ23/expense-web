import { z } from 'zod';

export const resetPasswordSchema = z.object({
    newPassword: z.string().regex(
        // eslint-disable-next-line sonarjs/concise-regex
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,45}$/,
        'The password should be strong',
    ),
    token: z.jwt(),
});

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
