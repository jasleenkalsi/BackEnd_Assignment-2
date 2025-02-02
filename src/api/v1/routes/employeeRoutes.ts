import { Router } from "express";
import {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employeeController";

const router: Router = Router();

/**
 * Define routes for employee management
 */
router.get("/", getAllEmployees); // Get all employees
router.post("/", addEmployee); // Add a new employee
router.put("/:id", updateEmployee); // Update an existing employee by ID
router.delete("/:id", deleteEmployee); // Delete an employee by ID

export default router;

