import { z } from 'zod';

import { passwordSchema } from '@/features/authentication/shared/schemas/passwordSchema';
import { tokenSchema } from '@/features/authentication/shared/schemas/tokenSchema';

export const resetPasswordSchema = z.object({
    newPassword: passwordSchema,
    token: tokenSchema,
});

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
