import { z } from 'zod';

import { nameSchema } from '@/features/shared/schemas/nameSchema';

export const createConsumerSchema = z.object({
    name: nameSchema,
});

export type TCreateConsumerSchema = z.infer<typeof createConsumerSchema>;
