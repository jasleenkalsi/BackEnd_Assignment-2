import { Router } from "express";
import {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../controllers.ts/employeeController";

const router: Router = Router();

/**
 * Define routes for book management
 */
router.get("/", getAllEmployees);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;

