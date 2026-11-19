import { z } from 'zod';

import { nameSchema } from '@/features/shared/schemas/nameSchema';

export const createLocationSchema = z.object({
    name: nameSchema,
});

export type TCreateLocationSchema = z.infer<typeof createLocationSchema>;
