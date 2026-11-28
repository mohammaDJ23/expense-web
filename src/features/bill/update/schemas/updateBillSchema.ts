import { z } from 'zod';

import { amountSchema } from '@/features/bill/shared/schemas/amountSchema';
import { descriptionSchema } from '@/features/bill/shared/schemas/descriptionSchema';
import { dateSchema } from '@/features/shared/schemas/dateSchema';
import { idSchema } from '@/features/shared/schemas/idSchema';

export const updateBillSchema = z.object({
    id: idSchema,
    amount: amountSchema,
    description: descriptionSchema,
    purchasedAt: dateSchema,
    receiverId: idSchema,
    locationId: idSchema,
    consumerIds: z.array(idSchema),
});

export type TUpdateBillSchema = z.infer<typeof updateBillSchema>;
