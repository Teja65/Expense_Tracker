import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

import { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';

const COLORS = ['#06b6d4', '#0f172a', '#14b8a6', '#8b5cf6', '#f97316'];

export default function ExpensePieChart() {
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const chartData = useMemo(() => {
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

  return (
    <div className='animate-rise rounded-3xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900'>
      <h2 className='mb-5 text-xl font-bold'>Category Spending</h2>

      <div className='h-64 overflow-hidden'>
        {chartData.length > 0 ? (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart margin={{ top: 8, right: 8, bottom: 24, left: 8 }}>
              <Pie
                data={chartData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='44%'
                outerRadius={78}
                label={false}
                labelLine={false}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend verticalAlign='bottom' height={28} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className='flex h-full items-center justify-center text-slate-500'>
            No spending data yet
          </div>
        )}
      </div>
    </div>
  );
}
