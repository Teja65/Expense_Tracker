export const APP_NAME = 'Expense Tracker';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

export const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Other',
];

export const SORT_OPTIONS = [
  {
    label: 'Latest',
    value: 'latest',
  },

  {
    label: 'Oldest',
    value: 'oldest',
  },

  {
    label: 'Amount Asc',
    value: 'asc',
  },

  {
    label: 'Amount Desc',
    value: 'desc',
  },
];
