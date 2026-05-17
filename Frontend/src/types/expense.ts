export type ExpenseCategory =
  | 'Food'
  | 'Travel'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Health'
  | 'Education'
  | 'Other';

export type Expense = {
  id: string;

  title: string;

  amount: number;

  category: ExpenseCategory;

  date: string;
};

export type ExpenseApiResponse = Omit<Expense, 'id'> & {
  _id?: string;

  id?: string;
};

export type ExpenseFormData = {
  title: string;

  amount: number;

  category: ExpenseCategory;

  date: string;
};

export type ExpenseState = {
  expenses: Expense[];

  loading: boolean;

  error: string | null;
};
