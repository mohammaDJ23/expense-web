import z from 'zod';

export const amountSchema = z
    .string()
    .regex(/^[1-9]\d*$/, 'Amount must be a positive integer without decimal');
