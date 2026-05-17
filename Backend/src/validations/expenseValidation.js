import Joi from 'joi';

export const expenseValidation = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(),
  date: Joi.date(),
});
