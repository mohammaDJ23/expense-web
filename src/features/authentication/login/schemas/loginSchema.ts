import { z } from 'zod';

import { emailSchema } from '@/features/authentication/shared/schemas/emailSchema';
import { passwordSchema } from '@/features/authentication/shared/schemas/passwordSchema';

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type TLoginSchema = z.infer<typeof loginSchema>;
