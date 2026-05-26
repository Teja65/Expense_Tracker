import DashboardLayout from '../components/layout/DashboardLayout';

import ExpensePieChart from '../components/charts/ExpensePieChart';

import ExpenseBarChart from '../components/charts/ExpenseBarChart';

import ExpenseLineChart from '../components/charts/ExpenseLineChart';

export default function Reports() {
  return (
    <DashboardLayout>
      <div className='space-y-8'>
        <div>
          <h1 className='text-4xl font-black'>Reports</h1>

          <p className='mt-2 text-zinc-500'>Analytics and insights</p>
        </div>

        <ExpensePieChart />

        <ExpenseBarChart />

        <ExpenseLineChart />
      </div>
    </DashboardLayout>
  );
}
