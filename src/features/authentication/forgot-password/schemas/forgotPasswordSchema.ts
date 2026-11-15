import { z } from 'zod';

import { emailSchema } from '@/features/authentication/shared/schemas/emailSchema';

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
