import type { Expense } from '../../types/expense';
import en from '../../en.json';

type Props = {
  expenses: Expense[];
};

const tableText = en.expenses.table;

export default function ExpenseTable({ expenses }: Props) {
  return (
    <div className='overflow-x-auto rounded-3xl bg-white shadow-xl dark:bg-zinc-900'>
      <table className='w-full min-w-[700px]'>
        <thead className='border-b border-zinc-200 dark:border-zinc-700'>
          <tr>
            <th className='px-6 py-4 text-left'>{tableText.title}</th>

            <th className='px-6 py-4 text-left'>{tableText.category}</th>

            <th className='px-6 py-4 text-left'>{tableText.amount}</th>

            <th className='px-6 py-4 text-left'>{tableText.date}</th>
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

              <td className='px-6 py-4 text-emerald-600'>
                Rs. {expense.amount}
              </td>

              <td className='px-6 py-4'>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
