import Joi from 'joi';

export const branchSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required() // Ensure it allows only 10-digit numbers
});
