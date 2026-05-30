import en from '../en.json';

export const APP_NAME = en.app.name;

const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

export const API_BASE_URL = rawApiUrl.endsWith('/api')
  ? rawApiUrl
  : `${rawApiUrl.replace(/\/$/, '')}/api`;

export const EXPENSE_CATEGORIES = en.expenses.categories;

export const SORT_OPTIONS = [
  {
    label: en.expenses.filters.sort.latest,
    value: 'latest',
  },

  {
    label: en.expenses.filters.sort.oldest,
    value: 'oldest',
  },

  {
    label: en.expenses.filters.sort.asc,
    value: 'asc',
  },

  {
    label: en.expenses.filters.sort.desc,
    value: 'desc',
  },
];
