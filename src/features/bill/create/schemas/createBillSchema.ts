import { z } from 'zod';

import { amountSchema } from '@/features/bill/shared/schemas/amountSchema';
import { descriptionSchema } from '@/features/bill/shared/schemas/descriptionSchema';
import { dateSchema } from '@/features/shared/schemas/dateSchema';
import { idSchema } from '@/features/shared/schemas/idSchema';

export const createBillSchema = z.object({
    amount: amountSchema,
    description: descriptionSchema,
    purchasedAt: dateSchema,
    receiverId: idSchema,
    locationId: idSchema,
    consumerIds: z.array(idSchema),
});

export type TCreateBillSchema = z.infer<typeof createBillSchema>;
