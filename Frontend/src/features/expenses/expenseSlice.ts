import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Expense, ExpenseFormData, ExpenseState } from '../../types/expense';
import {
  createExpense,
  deleteExpenseAPI,
  getExpenses,
  updateExpenseAPI,
} from './expenseAPI';

const initialState: ExpenseState = {
  expenses: [],

  loading: false,

  error: null,
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => getExpenses(),
);

export const createExpenseAsync = createAsyncThunk(
  'expenses/createExpense',
  async (data: ExpenseFormData) => createExpense(data),
);

export const updateExpenseAsync = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, data }: { id: string; data: ExpenseFormData }) =>
    updateExpenseAPI(id, data),
);

export const deleteExpenseAsync = createAsyncThunk(
  'expenses/deleteExpense',
  async (id: string) => {
    await deleteExpenseAPI(id);

    return id;
  },
);

const expenseSlice = createSlice({
  name: 'expenses',

  initialState,

  reducers: {
    addExpense: (
      state,
      action: {
        payload: Expense;
      },
    ) => {
      state.expenses.unshift(action.payload);
    },

    updateExpense: (
      state,
      action: {
        payload: Expense;
      },
    ) => {
      state.expenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense,
      );
    },

    deleteExpense: (
      state,
      action: {
        payload: string;
      },
    ) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
    },

    setExpenses: (
      state,
      action: {
        payload: Expense[];
      },
    ) => {
      state.expenses = action.payload;
    },

    clearExpenses: (state) => {
      state.expenses = [];

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load expenses';
      })
      .addCase(createExpenseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpenseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.unshift(action.payload);
      })
      .addCase(createExpenseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add expense';
      })
      .addCase(updateExpenseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense,
        );
      })
      .addCase(updateExpenseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update expense';
      })
      .addCase(deleteExpenseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload,
        );
      })
      .addCase(deleteExpenseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete expense';
      });
  },
});

export const {
  addExpense,
  updateExpense,
  deleteExpense,
  setExpenses,
  clearExpenses,
} = expenseSlice.actions;

export default expenseSlice.reducer;
