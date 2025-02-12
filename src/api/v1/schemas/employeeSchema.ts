
import Joi from "joi";

export const employeeSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    position: Joi.string().min(3).max(30).required(),
    department: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    branchId: Joi.string().required(),
});
