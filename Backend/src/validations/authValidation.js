import Joi from 'joi';

export const loginValidation = Joi.object({
  token: Joi.string().required(),
});
