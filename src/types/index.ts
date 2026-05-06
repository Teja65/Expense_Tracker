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
  userId: string; // For data privacy - ensures user can only access their own expenses
  description: string;
  amount: number;
  category: string;
  date: string;
  isPrivate?: boolean; // Optional privacy flag
}

export interface BudgetItem {
  id: string;
  userId: string; // For data privacy - ensures user can only access their own budgets
  category: string;
  limit: number;
  spent?: number;
  isPrivate?: boolean; // Optional privacy flag
}

export interface Category {
  id: string;
  userId: string; // For data privacy - ensures user can only access their own categories
  name: string;
  color?: string;
  icon?: string;
  isPrivate?: boolean; // Optional privacy flag
}

export interface PrivacySettings {
  userId: string;
  dataEncryption: boolean;
  profileVisibility: 'private' | 'public';
  expenseSharing: boolean;
  dataRetention: '1year' | '2years' | 'forever';
  analyticsConsent: boolean;
}
