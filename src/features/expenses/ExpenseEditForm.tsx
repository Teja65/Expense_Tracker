import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { updateExpense } from './expensesSlice';
import type { Expense, ExpenseFormValues } from '../../types';

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other',
];

interface ExpenseEditFormProps {
  expense: Expense;
  onCancel: () => void;
}

export default function ExpenseEditForm({
  expense,
  onCancel,
}: ExpenseEditFormProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    defaultValues: {
      amount: expense.amount.toString(),
      date: expense.date,
      description: expense.description,
      category: expense.category,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: ExpenseFormValues) => {
    try {
      setIsSubmitting(true);
      const updatedExpense: Expense = {
        ...expense,
        amount: parseFloat(values.amount),
        date: values.date,
        description: values.description,
        category: values.category,
      };

      dispatch(updateExpense(updatedExpense));
      onCancel();
    } catch (error) {
      console.error('Error updating expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 p-4 bg-slate-800 rounded-2xl border border-slate-600'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-semibold text-slate-300 mb-1'>
            Amount ($)
          </label>
          <input
            type='number'
            step='0.01'
            min='0'
            {...register('amount', {
              required: true,
              min: { value: 0.01, message: 'Amount must be greater than 0' },
            })}
            className='w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm'
          />
          {errors.amount && (
            <p className='mt-1 text-xs text-rose-400'>
              {errors.amount.message || 'Required'}
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-semibold text-slate-300 mb-1'>
            Date
          </label>
          <input
            type='date'
            {...register('date', { required: true })}
            className='w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm'
          />
          {errors.date && (
            <p className='mt-1 text-xs text-rose-400'>Required</p>
          )}
        </div>
      </div>

      <div>
        <label className='block text-sm font-semibold text-slate-300 mb-1'>
          Description
        </label>
        <input
          type='text'
          {...register('description', {
            required: true,
            minLength: { value: 3, message: 'At least 3 characters' },
          })}
          className='w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm'
        />
        {errors.description && (
          <p className='mt-1 text-xs text-rose-400'>
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-semibold text-slate-300 mb-1'>
          Category
        </label>
        <select
          {...register('category', { required: true })}
          className='w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm'
        >
          <option value=''>Select category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className='mt-1 text-xs text-rose-400'>Required</p>
        )}
      </div>

      <div className='flex gap-2 justify-end'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className='px-4 py-2 text-sm font-medium bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
