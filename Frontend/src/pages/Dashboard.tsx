import DashboardLayout from '../components/layout/DashboardLayout';
import { Heading1, Heading2, Paragraph } from '../components/ui/Text';

import { useAppSelector } from '../store/hooks';

export default function Dashboard() {
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        <div>
          <Heading1 className='text-4xl font-black'>Dashboard</Heading1>

          <Paragraph className='mt-2 text-zinc-500'>
            Overview of your expenses
          </Paragraph>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='rounded-3xl bg-emerald-600 p-8 text-white shadow-xl'>
            <Heading2 className='text-lg font-medium'>Total Expenses</Heading2>

            <Paragraph className='mt-4 text-4xl font-black'>
              Rs. {total}
            </Paragraph>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <Heading2 className='text-lg font-medium'>Transactions</Heading2>

            <Paragraph className='mt-4 text-4xl font-black'>
              {expenses.length}
            </Paragraph>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <Heading2 className='text-lg font-medium'>Categories</Heading2>

            <Paragraph className='mt-4 text-4xl font-black'>
              {new Set(expenses.map((expense) => expense.category)).size}
            </Paragraph>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
