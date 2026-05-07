import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { addExpense } from './expensesSlice';
import type { ExpenseFormValues } from '../../types';

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

export default function ExpenseForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormValues>({ mode: 'onSubmit' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: ExpenseFormValues) => {
    try {
      setIsSubmitting(true);
      const expense = {
        id: Date.now().toString(),
        amount: parseFloat(values.amount),
        date: values.date,
        description: values.description,
        category: values.category,
        createdAt: new Date().toISOString(),
      };

      dispatch(addExpense(expense));
      reset();
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 rounded-3xl border border-slate-700 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30'
    >
      <div>
        <label
          className='block text-sm font-semibold text-slate-300'
          htmlFor='amount'
        >
          Amount ($)
        </label>
        <input
          id='amount'
          type='number'
          step='0.01'
          min='0'
          {...register('amount', {
            required: true,
            min: { value: 0.01, message: 'Amount must be greater than 0' },
          })}
          className='mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
          placeholder='0.00'
        />
        {errors.amount && (
          <p className='mt-2 text-sm text-rose-400'>
            {errors.amount.message || 'Please enter a valid amount'}
          </p>
        )}
      </div>

      <div>
        <label
          className='block text-sm font-semibold text-slate-300'
          htmlFor='date'
        >
          Date
        </label>
        <input
          id='date'
          type='date'
          {...register('date', { required: true })}
          className='mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
        />
        {errors.date && (
          <p className='mt-2 text-sm text-rose-400'>Please select a date</p>
        )}
      </div>

      <div>
        <label
          className='block text-sm font-semibold text-slate-300'
          htmlFor='description'
        >
          Description
        </label>
        <input
          id='description'
          type='text'
          {...register('description', {
            required: true,
            minLength: {
              value: 3,
              message: 'Description must be at least 3 characters',
            },
          })}
          className='mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
          placeholder='What did you spend on?'
        />
        {errors.description && (
          <p className='mt-2 text-sm text-rose-400'>
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          className='block text-sm font-semibold text-slate-300'
          htmlFor='category'
        >
          Category
        </label>
        <select
          id='category'
          {...register('category', { required: true })}
          className='mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
        >
          <option value=''>Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className='mt-2 text-sm text-rose-400'>Please select a category</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-2xl bg-cyan-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? 'Adding Expense...' : 'Add Expense'}
      </button>
    </form>
  );
}
