import axios from 'axios';
import type { Expense } from '../types';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export async function fetchExpenses(): Promise<Expense[]> {
  const response = await apiClient.get<Expense[]>('/expenses');
  return response.data;
}

export async function createExpense(expense: Expense): Promise<Expense> {
  const response = await apiClient.post<Expense>('/expenses', expense);
  return response.data;
}
