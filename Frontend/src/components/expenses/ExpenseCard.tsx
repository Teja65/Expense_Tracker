import { Pencil, Trash2 } from 'lucide-react';

import type { Expense } from '../../types/expense';
import Button from '../ui/Button';
import { Heading2, Paragraph } from '../ui/Text';
import en from '../../en.json';

type Props = {
  expense: Expense;
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
};

export default function ExpenseCard({ expense, onEdit, onDelete }: Props) {
  return (
    <div className='rounded-3xl bg-white p-6 shadow-xl transition hover:shadow-2xl dark:bg-zinc-900'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <Heading2 className='text-xl font-bold'>{expense.title}</Heading2>

          <Paragraph className='mt-1 text-sm text-zinc-500'>
            {expense.category}
          </Paragraph>
        </div>

        <div className='text-right'>
          <Paragraph className='text-2xl font-black text-emerald-600'>
            Rs. {expense.amount}
          </Paragraph>

          <Paragraph className='text-sm text-zinc-500'>{expense.date}</Paragraph>
        </div>
      </div>

      <div className='mt-6 flex gap-3'>
        <Button
          type='button'
          onClick={() => onEdit?.(expense)}
          className='flex items-center gap-2 rounded-2xl border border-zinc-300 px-4 py-2 font-semibold dark:border-zinc-700'
        >
          <Pencil size={16} />
          {en.expenses.actions.edit}
        </Button>

        <Button
          type='button'
          onClick={() => onDelete?.(expense.id)}
          className='flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-2 font-semibold text-white'
        >
          <Trash2 size={16} />
          {en.expenses.actions.delete}
        </Button>
      </div>
    </div>
  );
}
