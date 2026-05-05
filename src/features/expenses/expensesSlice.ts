import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../types';

interface ExpensesState {
  items: Expense[];
}

const initialState: ExpensesState = {
  items: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action: PayloadAction<Expense[]>) {
      state.items = action.payload;
    },
    addExpense(state, action: PayloadAction<Expense>) {
      state.items.push(action.payload);
    },
  },
});

export const { setExpenses, addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
