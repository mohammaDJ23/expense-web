import { z } from 'zod';

import { emailSchema } from '@/features/authentication/shared/schemas/emailSchema';

export const localAccountInitiationSchema = z.object({
    email: emailSchema,
});

export type TLocalAccountInitiationSchema = z.infer<typeof localAccountInitiationSchema>;
