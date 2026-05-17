import { useMemo } from 'react';

import { useAppSelector } from '../app/hooks';

export default function useExpenses() {
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  const latestExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [expenses]);

  const monthlyExpenses = useMemo(() => {
    const grouped: Record<string, number> = {};

    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString('default', {
        month: 'short',
      });

      grouped[month] = (grouped[month] || 0) + expense.amount;
    });

    return Object.entries(grouped).map(([month, amount]) => ({
      month,

      amount,
    }));
  }, [expenses]);

  const categoryExpenses = useMemo(() => {
    const grouped: Record<string, number> = {};

    expenses.forEach((expense) => {
      grouped[expense.category] =
        (grouped[expense.category] || 0) + expense.amount;
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,

      value,
    }));
  }, [expenses]);

  return {
    expenses,

    totalExpenses,

    latestExpenses,

    monthlyExpenses,

    categoryExpenses,
  };
}
