import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Expense, BudgetItem, Category } from '../types';

export class DataManagement {
  static async exportUserData(userId: string): Promise<string> {
    try {
      const [expenses, budgets, categories] = await Promise.all([
        this.getUserExpenses(userId),
        this.getUserBudgets(userId),
        this.getUserCategories(userId),
      ]);

      const exportData = {
        userId,
        exportDate: new Date().toISOString(),
        data: {
          expenses,
          budgets,
          categories,
        },
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Failed to export user data:', error);
      throw new Error('Failed to export data');
    }
  }

  static async deleteUserData(userId: string): Promise<void> {
    try {
      // Delete all user expenses
      const expensesQuery = query(
        collection(db, 'expenses'),
        where('userId', '==', userId),
      );
      const expensesSnapshot = await getDocs(expensesQuery);
      const expenseDeletions = expensesSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref),
      );

      // Delete all user budgets
      const budgetsQuery = query(
        collection(db, 'budgets'),
        where('userId', '==', userId),
      );
      const budgetsSnapshot = await getDocs(budgetsQuery);
      const budgetDeletions = budgetsSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref),
      );

      // Delete all user categories
      const categoriesQuery = query(
        collection(db, 'categories'),
        where('userId', '==', userId),
      );
      const categoriesSnapshot = await getDocs(categoriesQuery);
      const categoryDeletions = categoriesSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref),
      );

      // Delete privacy settings
      const privacySettingsRef = doc(db, 'privacySettings', userId);
      const privacyDeletion = deleteDoc(privacySettingsRef);

      // Wait for all deletions to complete
      await Promise.all([
        ...expenseDeletions,
        ...budgetDeletions,
        ...categoryDeletions,
        privacyDeletion,
      ]);
    } catch (error) {
      console.error('Failed to delete user data:', error);
      throw new Error('Failed to delete data');
    }
  }

  private static async getUserExpenses(userId: string): Promise<Expense[]> {
    const q = query(collection(db, 'expenses'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Expense[];
  }

  private static async getUserBudgets(userId: string): Promise<BudgetItem[]> {
    const q = query(collection(db, 'budgets'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BudgetItem[];
  }

  private static async getUserCategories(userId: string): Promise<Category[]> {
    const q = query(
      collection(db, 'categories'),
      where('userId', '==', userId),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];
  }

  // Download data as JSON file
  static downloadData(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
