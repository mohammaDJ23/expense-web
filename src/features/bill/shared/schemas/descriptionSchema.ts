import z from 'zod';

// eslint-disable-next-line security/detect-unsafe-regex
export const descriptionSchema = z.string().regex(/^[^\s]+(\s+[^\s]+)*$/, 'Invalid description');
