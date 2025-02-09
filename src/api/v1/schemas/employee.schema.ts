import Joi from 'joi';

export const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().valid('Manager', 'Staff', 'Intern').required(),
  salary: Joi.number().positive().precision(2).required(),
});
