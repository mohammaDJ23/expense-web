import z from 'zod';

export const dateSchema = z.iso
    .date({
        message: 'It must be in mm/dd/yyyy format',
    })
    .transform((value) => new Date(value).toISOString());
