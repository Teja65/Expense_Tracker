import Expense from '../models/Expense.js';

export const createExpenseService = async (expenseData, userId) => {
  return await Expense.create({
    ...expenseData,
    user: userId,
  });
};

export const getExpensesService = async (userId) => {
  return await Expense.find({ user: userId }).sort({ createdAt: -1 });
};

export const updateExpenseService = async (expenseId, expenseData) => {
  return await Expense.findByIdAndUpdate(expenseId, expenseData, {
    new: true,
  });
};

export const deleteExpenseService = async (expenseId) => {
  return await Expense.findByIdAndDelete(expenseId);
};
