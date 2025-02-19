import Joi from "joi";

export const branchSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().pattern(/^\d{10,15}$/).required(), // 🔹 Fix phone validation
});
