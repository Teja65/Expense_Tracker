import type { Expense } from '../../types/expense';

type Props = {
  expenses: Expense[];
};

export default function ExpenseTable({ expenses }: Props) {
  return (
    <div className='overflow-x-auto rounded-3xl bg-white shadow-xl dark:bg-zinc-900'>
      <table className='w-full min-w-[700px]'>
        <thead className='border-b border-zinc-200 dark:border-zinc-700'>
          <tr>
            <th className='px-6 py-4 text-left'>Title</th>

            <th className='px-6 py-4 text-left'>Category</th>

            <th className='px-6 py-4 text-left'>Amount</th>

            <th className='px-6 py-4 text-left'>Date</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className='border-b border-zinc-100 dark:border-zinc-800'
            >
              <td className='px-6 py-4 font-semibold'>{expense.title}</td>

              <td className='px-6 py-4'>{expense.category}</td>

              <td className='px-6 py-4 text-emerald-600'>₹{expense.amount}</td>

              <td className='px-6 py-4'>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
