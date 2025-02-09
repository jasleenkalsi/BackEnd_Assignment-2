import { Router } from 'express';
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController'; // Adjust the path if necessary
import { validate } from '../middleware/validate';
import { employeeSchema } from '../schemas/employeeSchema';

const router: Router = Router();

// Define routes
router.get('/', getAllEmployees);
router.post('/', validate(employeeSchema), addEmployee);
router.put('/:id', validate(employeeSchema), updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
