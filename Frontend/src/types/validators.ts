import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),

  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z
  .object({
    email: z.string().email('Invalid email'),

    password: z.string().min(6, 'Password must be at least 6 characters'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',

    path: ['confirmPassword'],
  });

export const expenseSchema = z.object({
  title: z.string().min(2, 'Title is required'),

  amount: z.number().positive('Amount must be positive'),

  category: z.string().min(1, 'Category is required'),

  date: z.string(),
});
