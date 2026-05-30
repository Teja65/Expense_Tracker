import { useMemo, useState } from 'react';

import DashboardLayout from '../components/layout/DashboardLayout';

import ExpenseForm from '../components/expenses/ExpenseForm';

import ExpenseFilters from '../components/expenses/ExpenseFilters';

import ExpenseList from '../components/expenses/ExpenseList';
import Button from '../components/ui/Button';
import { Heading1 } from '../components/ui/Text';

import { useAppSelector } from '../store/hooks';
import { useAppDispatch } from '../store/hooks';
import {
  deleteExpenseAsync,
  fetchExpenses,
} from '../store/expenseSlice';
import type { Expense } from '../types/expense';
import toast from 'react-hot-toast';
import { Paragraph } from '../components/ui/Text';
import en from '../en.json';

const expensesText = en.expenses;

export default function Expenses() {
  const dispatch = useAppDispatch();

  const { error, expenses, loading } = useAppSelector(
    (state) => state.expenses,
  );

  const [search, setSearch] = useState('');

  const [category, setCategory] = useState('');

  const [sort, setSort] = useState('latest');

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const filteredExpenses = useMemo(() => {
    let filtered = [...expenses];

    if (search) {
      filtered = filtered.filter((expense) =>
        expense.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      filtered = filtered.filter((expense) => expense.category === category);
    }

    switch (sort) {
      case 'asc':
        filtered.sort((a, b) => a.amount - b.amount);
        break;

      case 'desc':
        filtered.sort((a, b) => b.amount - a.amount);
        break;

      case 'oldest':
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;

      default:
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }

    return filtered;
  }, [expenses, search, category, sort]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteExpenseAsync(id)).unwrap();

      toast.success(expensesText.deleted);

      if (editingExpense?.id === id) {
        setEditingExpense(null);
      }
    } catch {
      toast.error(expensesText.deleteFailed);
    }
  };

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <Heading1 className='text-4xl font-black'>
            {expensesText.title}
          </Heading1>

          <Button
            type='button'
            onClick={() => dispatch(fetchExpenses())}
            className='rounded-2xl border border-zinc-300 px-5 py-2 font-semibold dark:border-zinc-700'
          >
            {expensesText.refresh}
          </Button>
        </div>

        {error && (
          <Paragraph className='rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300'>
            {error}
          </Paragraph>
        )}

        <ExpenseForm
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />

        <ExpenseFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {loading && !expenses.length ? (
          <div className='rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-zinc-900'>
            {expensesText.loading}
          </div>
        ) : (
          <ExpenseList
            expenses={filteredExpenses}
            onEdit={setEditingExpense}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
