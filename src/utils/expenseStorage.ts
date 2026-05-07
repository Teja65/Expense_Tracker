import type { Expense } from '../types';

const EXPENSES_STORAGE_KEY = 'expense_tracker_expenses';

/**
 * Save expenses to localStorage
 * This persists expense data locally and can be exported for backend integration
 */
export const saveExpensesToStorage = (expenses: Expense[]): void => {
  try {
    const expenseData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      expenses: expenses,
      totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
      totalTransactions: expenses.length,
    };
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenseData));
  } catch (error) {
    console.error('Failed to save expenses to storage:', error);
  }
};

/**
 * Load expenses from localStorage
 */
export const loadExpensesFromStorage = (): Expense[] => {
  try {
    const data = localStorage.getItem(EXPENSES_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.expenses || [];
    }
  } catch (error) {
    console.error('Failed to load expenses from storage:', error);
  }
  return [];
};

/**
 * Export expenses as JSON file for download
 * Includes metadata for backend integration
 */
export const exportExpensesAsJSON = (
  expenses: Expense[],
  userName: string = 'user',
): void => {
  try {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      exportedBy: userName,
      expenses: expenses,
      summary: {
        totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
        totalTransactions: expenses.length,
        dateRange: {
          earliest:
            expenses.length > 0
              ? new Date(
                  Math.min(...expenses.map((e) => new Date(e.date).getTime())),
                ).toISOString()
              : null,
          latest:
            expenses.length > 0
              ? new Date(
                  Math.max(...expenses.map((e) => new Date(e.date).getTime())),
                ).toISOString()
              : null,
        },
        categories: Array.from(new Set(expenses.map((e) => e.category))),
      },
    };

    const dataString = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export expenses:', error);
  }
};

/**
 * Get formatted expense data for API submission
 * Prepares data for backend integration
 */
export const formatExpensesForAPI = (
  expenses: Expense[],
  userId: string,
): Record<string, any> => {
  return {
    userId,
    exportedAt: new Date().toISOString(),
    expenses: expenses.map((expense) => ({
      ...expense,
      amount: parseFloat(expense.amount.toString()),
    })),
    metadata: {
      totalExpenses: expenses.length,
      totalAmount: expenses.reduce(
        (sum, exp) => sum + parseFloat(exp.amount.toString()),
        0,
      ),
      byCategory: expenses.reduce(
        (acc, exp) => {
          if (!acc[exp.category]) {
            acc[exp.category] = { count: 0, total: 0 };
          }
          acc[exp.category].count += 1;
          acc[exp.category].total += parseFloat(exp.amount.toString());
          return acc;
        },
        {} as Record<string, { count: number; total: number }>,
      ),
    },
  };
};

/**
 * Clear all stored expenses
 */
export const clearExpensesStorage = (): void => {
  try {
    localStorage.removeItem(EXPENSES_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear expenses storage:', error);
  }
};
