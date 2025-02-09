import Joi from 'joi';

export const branchSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  location: Joi.string().min(5).max(100).required(),
  managerId: Joi.string().required(),
});
