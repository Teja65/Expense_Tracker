import Expense from '../models/Expense.js';

export const createExpense = async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json(expense);
};

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({
    date: -1,
    createdAt: -1,
  });

  res.status(200).json(expenses);
};

export const updateExpense = async (req, res) => {
  const expense = await Expense.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!expense) {
    return res.status(404).json({
      message: 'Expense not found',
    });
  }

  res.status(200).json(expense);
};

export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!expense) {
    return res.status(404).json({
      message: 'Expense not found',
    });
  }

  res.status(200).json({ message: 'Expense deleted' });
};
