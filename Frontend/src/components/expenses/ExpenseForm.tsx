import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { useAppDispatch } from '../../app/hooks';

import {
  createExpenseAsync,
  updateExpenseAsync,
} from '../../features/expenses/expenseSlice';

import type { Expense, ExpenseFormData } from '../../types/expense';

const categories = [
  'Food',
  'Travel',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Other',
] as const;

type Props = {
  editingExpense?: Expense | null;
  onCancelEdit?: () => void;
};

const emptyForm: ExpenseFormData = {
  title: '',
  amount: 0,
  category: 'Food',
  date: '',
};

export default function ExpenseForm({ editingExpense, onCancelEdit }: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    defaultValues: emptyForm,
  });

  useEffect(() => {
    reset(editingExpense || emptyForm);
  }, [editingExpense, reset]);

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      if (editingExpense) {
        await dispatch(
          updateExpenseAsync({
            id: editingExpense.id,
            data,
          }),
        ).unwrap();

        toast.success('Expense Updated');
        onCancelEdit?.();
      } else {
        await dispatch(createExpenseAsync(data)).unwrap();

        toast.success('Expense Added');
      }

      reset(emptyForm);
    } catch {
      toast.error(editingExpense ? 'Update Failed' : 'Add Failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900'
    >
      <h2 className='mb-6 text-3xl font-black'>
        {editingExpense ? 'Edit Expense' : 'Add Expense'}
      </h2>

      <div className='grid gap-6 md:grid-cols-2'>
        <div>
          <label className='mb-2 block text-sm font-semibold'>Title</label>
          <input
            type='text'
            placeholder='Expense title'
            {...register('title', {
              required: 'Title is required',
            })}
            className='w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950'
          />
          {errors.title && (
            <p className='mt-2 text-sm text-red-500'>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold'>Amount</label>
          <input
            type='number'
            placeholder='Expense amount'
            {...register('amount', {
              valueAsNumber: true,
              required: 'Amount is required',
              min: {
                value: 1,
                message: 'Amount must be greater than 0',
              },
            })}
            className='w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950'
          />
          {errors.amount && (
            <p className='mt-2 text-sm text-red-500'>{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold'>Category</label>
          <select
            {...register('category', {
              required: 'Category is required',
            })}
            className='w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950'
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className='mt-2 text-sm text-red-500'>
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold'>Date</label>
          <input
            type='date'
            {...register('date', {
              required: 'Date is required',
            })}
            className='w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950'
          />
          {errors.date && (
            <p className='mt-2 text-sm text-red-500'>{errors.date.message}</p>
          )}
        </div>
      </div>

      <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
        <button
          disabled={isSubmitting}
          className='flex-1 rounded-2xl bg-cyan-600 py-4 text-lg font-bold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSubmitting
            ? 'Saving...'
            : editingExpense
              ? 'Update Expense'
              : 'Add Expense'}
        </button>

        {editingExpense && (
          <button
            type='button'
            onClick={onCancelEdit}
            className='rounded-2xl border border-slate-300 px-6 py-4 font-semibold dark:border-slate-700'
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
