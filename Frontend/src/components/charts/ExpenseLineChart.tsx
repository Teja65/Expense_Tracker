import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';

export default function ExpenseLineChart() {
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    expenses.forEach((expense) => {
      const day = new Date(expense.date).toLocaleDateString();

      grouped[day] = (grouped[day] || 0) + expense.amount;
    });

    return Object.entries(grouped).map(([date, amount]) => ({
      date,
      amount,
    }));
  }, [expenses]);

  return (
    <div className='h-64 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900'>
      <h2 className='mb-5 text-xl font-bold'>Expense Trend</h2>

      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='date' />

          <YAxis />

          <Tooltip />

          <Line
            type='monotone'
            dataKey='amount'
            stroke='#059669'
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
