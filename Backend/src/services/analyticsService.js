import Expense from '../models/Expense.js';

export const getAnalyticsService = async (userId) => {
  const expenses = await Expense.find({ user: userId });

  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

  const categoryBreakdown = await Expense.aggregate([
    {
      $match: {
        user: expenses[0]?.user,
      },
    },
    {
      $group: {
        _id: '$category',
        total: {
          $sum: '$amount',
        },
      },
    },
  ]);

  return {
    totalExpense,
    totalTransactions: expenses.length,
    categoryBreakdown,
    expenses,
  };
};
