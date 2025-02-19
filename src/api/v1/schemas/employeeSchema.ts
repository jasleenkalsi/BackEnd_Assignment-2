import Joi from "joi";

export const employeeSchema = Joi.object({
  name: Joi.string(),
  position: Joi.string(),
  department: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\d{10}$/),
  branchId: Joi.string(),
  salary: Joi.number(),
}).min(1);