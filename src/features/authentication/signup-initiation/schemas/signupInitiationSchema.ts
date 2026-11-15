import { z } from 'zod';

import { emailSchema } from '@/features/authentication/shared/schemas/emailSchema';

export const signupInitiationSchema = z.object({
    email: emailSchema,
});

export type TSignupInitiationSchema = z.infer<typeof signupInitiationSchema>;
