import { z } from 'zod';

import { nameSchema } from '@/features/shared/schemas/nameSchema';

export const createReceiverSchema = z.object({
    name: nameSchema,
});

export type TCreateReceiverSchema = z.infer<typeof createReceiverSchema>;
