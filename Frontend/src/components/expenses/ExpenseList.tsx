import ExpenseCard from './ExpenseCard';

import type { Expense } from '../../types/expense';

type Props = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  if (!expenses.length) {
    return (
      <div className='rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-900'>
        <h2 className='text-2xl font-black'>No Expenses Found</h2>

        <p className='mt-3 text-slate-500'>Add your first expense</p>
      </div>
    );
  }

  return (
    <div className='grid gap-6'>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
