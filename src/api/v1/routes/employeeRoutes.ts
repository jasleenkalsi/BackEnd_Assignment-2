import { Router } from "express";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../schemas/employeeSchema"; // Ensure correct path

const router: Router = Router();

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve all employees
 *     description: Get a list of all employees from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list.
 */
router.get("/", getAllEmployees);

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Add a new employee
 *     description: Create a new employee record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               email:
 *                 type: string
 *               branchId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee added successfully.
 */
router.post("/", validateRequest(employeeSchema), addEmployee);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     description: Update an existing employee's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               email:
 *                 type: string
 *               branchId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 */
router.put("/:id", validateRequest(employeeSchema), updateEmployee);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Remove an employee from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully.
 */
router.delete("/:id", deleteEmployee);

export default router;
