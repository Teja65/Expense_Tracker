import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Please use a valid email address.'),
  password: z.string().min(6, 'Password must contain at least 6 characters.'),
});

export const signupSchema = authSchema;
export const loginSchema = authSchema;
