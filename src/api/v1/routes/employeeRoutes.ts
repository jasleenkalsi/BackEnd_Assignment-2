import { Router } from 'express';
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController'; // Adjust the path if necessary

const router: Router = Router();

// Define routes
router.get('/', getAllEmployees);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
