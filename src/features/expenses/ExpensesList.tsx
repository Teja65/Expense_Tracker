import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeExpense } from './expensesSlice';
import ExpenseEditForm from './ExpenseEditForm';
import type { Expense } from '../../types';

type FilterType = 'all' | 'daily' | 'monthly' | 'yearly' | 'lastYear';

interface ExpensesListProps {
  onFilterChange?: (filter: FilterType) => void;
  currentFilter?: FilterType;
}

export default function ExpensesList({
  onFilterChange,
  currentFilter = 'all',
}: ExpensesListProps) {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const [filter, setFilter] = useState<FilterType>(currentFilter);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    onFilterChange?.(newFilter);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const filterExpenses = (expenses: Expense[], filterType: FilterType) => {
    const now = new Date();

    switch (filterType) {
      case 'daily':
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate.toDateString() === now.toDateString();
        });
      case 'monthly':
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getMonth() === now.getMonth() &&
            expenseDate.getFullYear() === now.getFullYear()
          );
        });
      case 'yearly':
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getFullYear() === now.getFullYear();
        });
      case 'lastYear':
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getFullYear() === now.getFullYear() - 1;
        });
      default:
        return expenses;
    }
  };

  const filteredExpenses = filterExpenses(expenses, filter);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(removeExpense(id));
    }
  };

  const getFilterLabel = (filterType: FilterType) => {
    switch (filterType) {
      case 'daily':
        return 'Today';
      case 'monthly':
        return 'This Month';
      case 'yearly':
        return 'This Year';
      case 'lastYear':
        return 'Last Year';
      default:
        return 'All Time';
    }
  };

  if (expenses.length === 0) {
    return (
      <div className='rounded-3xl border border-slate-700 bg-slate-950/80 p-8 text-center'>
        <div className='text-slate-400'>
          <svg
            className='mx-auto h-12 w-12 mb-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1}
              d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
            />
          </svg>
          <h3 className='text-lg font-medium text-slate-300 mb-2'>
            No expenses yet
          </h3>
          <p className='text-sm'>
            Add your first expense using the form above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-3xl border border-slate-700 bg-slate-950/80 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-xl font-semibold text-white'>Recent Expenses</h3>

        {/* Filter Buttons */}
        <div className='flex gap-2'>
          {(
            ['all', 'daily', 'monthly', 'yearly', 'lastYear'] as FilterType[]
          ).map((filterType) => (
            <button
              key={filterType}
              onClick={() => handleFilterChange(filterType)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === filterType
                  ? 'bg-cyan-500 text-slate-950 font-medium'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {getFilterLabel(filterType)}
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-4'>
        {filteredExpenses.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-slate-400'>
              No expenses found for {getFilterLabel(filter).toLowerCase()}.
            </p>
          </div>
        ) : (
          filteredExpenses.map((expense: Expense) => (
            <div
              key={expense.id}
              className='p-4 rounded-2xl border border-slate-700 bg-slate-900/50'
            >
              {editingId === expense.id ? (
                <ExpenseEditForm
                  expense={expense}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className='flex items-center justify-between hover:bg-slate-900/80 transition-colors group rounded-xl p-2 -m-2'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-1'>
                      <h4 className='font-medium text-white'>
                        {expense.description}
                      </h4>
                      <span className='px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300'>
                        {expense.category}
                      </span>
                    </div>
                    <p className='text-sm text-slate-400'>
                      {formatDate(expense.date)}
                    </p>
                  </div>

                  <div className='flex items-center gap-3'>
                    <div className='text-right'>
                      <p className='text-lg font-semibold text-cyan-400'>
                        {formatCurrency(expense.amount)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <button
                        onClick={() => setEditingId(expense.id)}
                        className='p-2 text-slate-400 hover:text-cyan-400 transition-colors'
                        title='Edit expense'
                      >
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className='p-2 text-slate-400 hover:text-red-400 transition-colors'
                        title='Delete expense'
                      >
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
