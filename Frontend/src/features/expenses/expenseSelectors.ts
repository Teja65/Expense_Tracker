import type { RootState } from '../../app/store';

export const selectExpenses = (state: RootState) => state.expenses.expenses;

export const selectTotalExpenses = (state: RootState) =>
  state.expenses.expenses.reduce((total, expense) => total + expense.amount, 0);

export const selectCategoryTotals = (state: RootState) => {
  const categoryMap: Record<string, number> = {};

  state.expenses.expenses.forEach((expense) => {
    if (categoryMap[expense.category]) {
      categoryMap[expense.category] += expense.amount;
    } else {
      categoryMap[expense.category] = expense.amount;
    }
  });

  return Object.entries(categoryMap).map(([name, value]) => ({
    name,

    value,
  }));
};

export const selectMonthlyExpenses = (state: RootState) => {
  const monthlyMap: Record<string, number> = {};

  state.expenses.expenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleString('default', {
      month: 'short',
    });

    if (monthlyMap[month]) {
      monthlyMap[month] += expense.amount;
    } else {
      monthlyMap[month] = expense.amount;
    }
  });

  return Object.entries(monthlyMap).map(([month, amount]) => ({
    month,

    amount,
  }));
};

export const selectSortedExpenses = (state: RootState) => {
  return [...state.expenses.expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const selectExpenseById = (state: RootState) => (id: string) => {
  return state.expenses.expenses.find((expense) => expense.id === id);
};