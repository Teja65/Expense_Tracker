import Expense from '../models/Expense.js';

export const getDashboardData = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });

  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

  res.status(200).json({
    totalExpense,
    totalTransactions: expenses.length,
    expenses,
  });
};
