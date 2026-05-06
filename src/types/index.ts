export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface AuthFormValues {
  email: string;
  password: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  limit: number;
}
