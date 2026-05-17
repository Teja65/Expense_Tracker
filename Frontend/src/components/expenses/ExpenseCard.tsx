import { Pencil, Trash2 } from 'lucide-react';

import type { Expense } from '../../types/expense';

type Props = {
  expense: Expense;
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
};

export default function ExpenseCard({ expense, onEdit, onDelete }: Props) {
  return (
    <div className='rounded-3xl bg-white p-6 shadow-xl transition hover:shadow-2xl dark:bg-slate-900'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-xl font-bold'>{expense.title}</h3>

          <p className='mt-1 text-sm text-slate-500'>{expense.category}</p>
        </div>

        <div className='text-right'>
          <p className='text-2xl font-black text-cyan-600'>
            ₹{expense.amount}
          </p>

          <p className='text-sm text-slate-500'>{expense.date}</p>
        </div>
      </div>

      <div className='mt-6 flex gap-3'>
        <button
          type='button'
          onClick={() => onEdit?.(expense)}
          className='flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 font-semibold dark:border-slate-700'
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          type='button'
          onClick={() => onDelete?.(expense.id)}
          className='flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-2 font-semibold text-white'
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
