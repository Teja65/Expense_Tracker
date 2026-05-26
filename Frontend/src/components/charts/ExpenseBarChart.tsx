import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';

export default function ExpenseBarChart() {
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const chartData = useMemo(() => {
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

  return (
    <div className='h-64 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900'>
      <h2 className='mb-5 text-xl font-bold'>Monthly Expenses</h2>

      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='month' />

          <YAxis />

          <Tooltip />

          <Bar dataKey='amount' fill='#059669' radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
