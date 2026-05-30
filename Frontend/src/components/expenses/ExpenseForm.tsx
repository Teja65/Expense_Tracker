import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { useAppDispatch } from '../../store/hooks';

import {
  createExpenseAsync,
  updateExpenseAsync,
} from '../../store/expenseSlice';

import type {
  Expense,
  ExpenseCategory,
  ExpenseFormData,
} from '../../types/expense';
import Button from '../ui/Button';
import Form from '../ui/Form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Heading2, LabelText, Paragraph } from '../ui/Text';
import { EXPENSE_CATEGORIES } from '../../types/constants';
import en from '../../en.json';

const categories = EXPENSE_CATEGORIES as ExpenseCategory[];
const expenseText = en.expenses;

type Props = {
  editingExpense?: Expense | null;
  onCancelEdit?: () => void;
};

const emptyForm: ExpenseFormData = {
  title: '',
  amount: 0,
  category: categories[0],
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

        toast.success(expenseText.form.updated);
        onCancelEdit?.();
      } else {
        await dispatch(createExpenseAsync(data)).unwrap();

        toast.success(expenseText.form.added);
      }

      reset(emptyForm);
    } catch {
      toast.error(
        editingExpense ? expenseText.form.updateFailed : expenseText.form.addFailed,
      );
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900'
    >
      <Heading2 className='mb-6 text-3xl font-black'>
        {editingExpense ? expenseText.form.editTitle : expenseText.form.addTitle}
      </Heading2>

      <div className='grid gap-6 md:grid-cols-2'>
        <div>
          <LabelText className='mb-2 block text-sm font-semibold'>
            {expenseText.form.titleLabel}
          </LabelText>
          <Input
            type='text'
            placeholder={expenseText.form.titlePlaceholder}
            {...register('title', {
              required: expenseText.validation.titleRequired,
            })}
          />
          {errors.title && (
            <Paragraph className='mt-2 text-sm text-red-500'>
              {errors.title.message}
            </Paragraph>
          )}
        </div>

        <div>
          <LabelText className='mb-2 block text-sm font-semibold'>
            {expenseText.form.amountLabel}
          </LabelText>
          <Input
            type='number'
            placeholder={expenseText.form.amountPlaceholder}
            {...register('amount', {
              valueAsNumber: true,
              required: expenseText.validation.amountRequired,
              min: {
                value: 1,
                message: expenseText.validation.amountMin,
              },
            })}
          />
          {errors.amount && (
            <Paragraph className='mt-2 text-sm text-red-500'>
              {errors.amount.message}
            </Paragraph>
          )}
        </div>

        <div>
          <LabelText className='mb-2 block text-sm font-semibold'>
            {expenseText.form.categoryLabel}
          </LabelText>
          <Select
            {...register('category', {
              required: expenseText.validation.categoryRequired,
            })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          {errors.category && (
            <Paragraph className='mt-2 text-sm text-red-500'>
              {errors.category.message}
            </Paragraph>
          )}
        </div>

        <div>
          <LabelText className='mb-2 block text-sm font-semibold'>
            {expenseText.form.dateLabel}
          </LabelText>
          <Input
            type='date'
            {...register('date', {
              required: expenseText.validation.dateRequired,
            })}
          />
          {errors.date && (
            <Paragraph className='mt-2 text-sm text-red-500'>
              {errors.date.message}
            </Paragraph>
          )}
        </div>
      </div>

      <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
        <Button
          type='submit'
          disabled={isSubmitting}
          className='flex-1 rounded-2xl bg-emerald-600 py-4 text-lg font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSubmitting
            ? expenseText.form.saving
            : editingExpense
              ? expenseText.form.update
              : expenseText.form.add}
        </Button>

        {editingExpense && (
          <Button
            type='button'
            onClick={onCancelEdit}
            className='rounded-2xl border border-zinc-300 px-6 py-4 font-semibold dark:border-zinc-700'
          >
            {expenseText.form.cancel}
          </Button>
        )}
      </div>
    </Form>
  );
}
