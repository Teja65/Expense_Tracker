import ExpenseCard from './ExpenseCard';
import EmptyState from '../ui/EmptyState';

import type { Expense } from '../../types/expense';
import en from '../../en.json';

type Props = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  if (!expenses.length) {
    return (
      <EmptyState
        title={en.expenses.empty.title}
        description={en.expenses.empty.description}
      />
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
