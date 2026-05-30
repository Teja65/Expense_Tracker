import DashboardLayout from '../components/layout/DashboardLayout';
import { Heading1, Heading2, Paragraph } from '../components/ui/Text';
import ExpensePieChart from '../components/charts/ExpensePieChart';
import ExpenseBarChart from '../components/charts/ExpenseBarChart';
import ExpenseLineChart from '../components/charts/ExpenseLineChart';

import { useAppSelector } from '../store/hooks';
import en from '../en.json';

const dashboardText = en.dashboard;
const reportsText = en.reports;

export default function Dashboard() {
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const average = expenses.length ? Math.round(total / expenses.length) : 0;
  const highest = expenses.reduce(
    (max, expense) => Math.max(max, expense.amount),
    0,
  );
  const latestExpense = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        <div>
          <Heading1 className='text-4xl font-black'>
            {dashboardText.title}
          </Heading1>

          <Paragraph className='mt-2 text-zinc-500'>
            {dashboardText.description}
          </Paragraph>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='rounded-3xl bg-emerald-600 p-8 text-white shadow-xl'>
            <Heading2 className='text-lg font-medium'>
              {dashboardText.cards.total}
            </Heading2>

            <Paragraph className='mt-4 text-4xl font-black'>
              Rs. {total}
            </Paragraph>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <Heading2 className='text-lg font-medium'>
              {dashboardText.cards.transactions}
            </Heading2>

            <Paragraph className='mt-4 text-4xl font-black'>
              {expenses.length}
            </Paragraph>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <Heading2 className='text-lg font-medium'>
              {dashboardText.cards.categories}
            </Heading2>

            <Paragraph className='mt-4 text-4xl font-black'>
              {new Set(expenses.map((expense) => expense.category)).size}
            </Paragraph>
          </div>
        </div>

        <div>
          <Heading2 className='text-3xl font-black'>{reportsText.title}</Heading2>

          <Paragraph className='mt-2 text-zinc-500'>
            {reportsText.description}
          </Paragraph>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <Heading2 className='text-lg font-medium'>
              {reportsText.summary.average}
            </Heading2>

            <Paragraph className='mt-4 text-4xl font-black'>
              Rs. {average}
            </Paragraph>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <Heading2 className='text-lg font-medium'>
              {reportsText.summary.highest}
            </Heading2>

            <Paragraph className='mt-4 text-4xl font-black'>
              Rs. {highest}
            </Paragraph>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900'>
            <Heading2 className='text-lg font-medium'>
              {reportsText.summary.latest}
            </Heading2>

            <Paragraph className='mt-4 text-xl font-black'>
              {latestExpense?.title || reportsText.emptyValue}
            </Paragraph>
          </div>
        </div>

        <ExpensePieChart />

        <ExpenseBarChart />

        <ExpenseLineChart />
      </div>
    </DashboardLayout>
  );
}
