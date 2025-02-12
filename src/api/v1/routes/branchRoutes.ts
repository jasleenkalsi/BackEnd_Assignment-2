import { Router } from "express";
import { validate } from "../middleware/validate"; // Ensure correct import
import { branchSchema } from "../schemas/branchSchema";
import {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     summary: Get all branches
 *     description: Retrieve a list of all branches from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of branches.
 */
router.get("/", getAllBranches);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     description: Retrieve details of a specific branch using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved branch details.
 *       404:
 *         description: Branch not found.
 */
router.get("/:id", getBranchById);

/**
 * @swagger
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     description: Add a new branch to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the branch
 *               address:
 *                 type: string
 *                 description: Address of the branch
 *               phone:
 *                 type: string
 *                 description: Contact phone number
 *     responses:
 *       201:
 *         description: Branch created successfully.
 */
router.post("/", validate(branchSchema), createBranch);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch
 *     description: Modify an existing branch's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the branch
 *               address:
 *                 type: string
 *                 description: Updated address of the branch
 *               phone:
 *                 type: string
 *                 description: Updated contact phone number
 *     responses:
 *       200:
 *         description: Branch updated successfully.
 */
router.put("/:id", validate(branchSchema), updateBranch);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     description: Remove a branch from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch to delete.
 *     responses:
 *       200:
 *         description: Branch deleted successfully.
 *       404:
 *         description: Branch not found.
 */
router.delete("/:id", deleteBranch);

export default router;
