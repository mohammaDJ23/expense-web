import z from 'zod';

export const dateSchema = z.iso
    .date({
        message: 'It must be in yyyy-MM-dd format',
    })
    .transform((value) => new Date(value).toISOString());
