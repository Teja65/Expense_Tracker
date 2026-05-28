import DashboardLayout from '../components/layout/DashboardLayout';
import { Heading1, Paragraph } from '../components/ui/Text';

import ExpensePieChart from '../components/charts/ExpensePieChart';

import ExpenseBarChart from '../components/charts/ExpenseBarChart';

import ExpenseLineChart from '../components/charts/ExpenseLineChart';

export default function Reports() {
  return (
    <DashboardLayout>
      <div className='space-y-8'>
        <div>
          <Heading1 className='text-4xl font-black'>Reports</Heading1>

          <Paragraph className='mt-2 text-zinc-500'>
            Analytics and insights
          </Paragraph>
        </div>

        <ExpensePieChart />

        <ExpenseBarChart />

        <ExpenseLineChart />
      </div>
    </DashboardLayout>
  );
}
