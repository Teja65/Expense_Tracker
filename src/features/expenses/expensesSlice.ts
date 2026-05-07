import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../types';
import { loadExpensesFromStorage } from '../../utils/expenseStorage';

interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: loadExpensesFromStorage(), // Load from localStorage on app start
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.unshift(action.payload); // Add to beginning of array
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addExpense,
  removeExpense,
  updateExpense,
  setExpenses,
  setLoading,
  setError,
} = expensesSlice.actions;

export default expensesSlice.reducer;
