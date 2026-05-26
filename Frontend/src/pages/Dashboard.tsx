import DashboardLayout from '../components/layout/DashboardLayout';

import { useAppSelector } from '../app/hooks';

export default function Dashboard() {
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        <div>
          <h1 className='text-4xl font-black'>Dashboard</h1>

          <p className='mt-2 text-zinc-500'>Overview of your expenses</p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='rounded-3xl bg-emerald-600 p-8 text-white shadow-xl'>
            <h2 className='text-lg font-medium'>Total Expenses</h2>

            <p className='mt-4 text-4xl font-black'>₹{total}</p>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <h2 className='text-lg font-medium'>Transactions</h2>

            <p className='mt-4 text-4xl font-black'>{expenses.length}</p>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <h2 className='text-lg font-medium'>Categories</h2>

            <p className='mt-4 text-4xl font-black'>
              {new Set(expenses.map((expense) => expense.category)).size}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
