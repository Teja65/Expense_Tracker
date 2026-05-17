import axiosInstance from '../../services/axios';

import type {
  Expense,
  ExpenseApiResponse,
  ExpenseFormData,
} from '../../types/expense';

const normalizeExpense = (expense: ExpenseApiResponse): Expense => ({
  id: expense.id || expense._id || '',
  title: expense.title,
  amount: expense.amount,
  category: expense.category,
  date: new Date(expense.date).toISOString().slice(0, 10),
});

export const getExpenses = async () => {
  const response = await axiosInstance.get('/expenses');

  return response.data.map(normalizeExpense);
};

export const createExpense = async (data: ExpenseFormData) => {
  const response = await axiosInstance.post('/expenses', data);

  return normalizeExpense(response.data);
};

export const updateExpenseAPI = async (id: string, data: ExpenseFormData) => {
  const response = await axiosInstance.patch(`/expenses/${id}`, data);

  return normalizeExpense(response.data);
};

export const deleteExpenseAPI = async (id: string) => {
  const response = await axiosInstance.delete(`/expenses/${id}`);

  return response.data;
};

export const getExpenseById = async (id: string) => {
  const response = await axiosInstance.get(`/expenses/${id}`);

  return normalizeExpense(response.data);
};
