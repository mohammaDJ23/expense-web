import z from 'zod';

// eslint-disable-next-line security/detect-unsafe-regex
export const nameSchema = z.string().regex(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, 'Invalid name');
