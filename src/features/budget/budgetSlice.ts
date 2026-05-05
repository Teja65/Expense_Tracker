import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BudgetItem } from '../../types';

interface BudgetState {
  items: BudgetItem[];
}

const initialState: BudgetState = {
  items: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudget(state, action: PayloadAction<BudgetItem[]>) {
      state.items = action.payload;
    },
    updateBudget(state, action: PayloadAction<BudgetItem>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setBudget, updateBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
