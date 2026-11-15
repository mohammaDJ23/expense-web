import { z } from 'zod';

import { passwordSchema } from '@/features/authentication/shared/schemas/passwordSchema';
import { tokenSchema } from '@/features/authentication/shared/schemas/tokenSchema';

export const signupSchema = z.object({
    password: passwordSchema,
    token: tokenSchema,
});

export type TSignupSchema = z.infer<typeof signupSchema>;
