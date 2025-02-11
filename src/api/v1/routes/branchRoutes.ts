import { Router } from "express";
import { validateRequest } from "../middleware/validate";
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
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: Unique branch ID
 *         name:
 *           type: string
 *           description: Name of the branch
 *         location:
 *           type: string
 *           description: Address or location of the branch
 *       example:
 *         id: "1"
 *         name: "Main Branch"
 *         location: "123 Main St, Cityville"
 */

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     summary: Get all branches
 *     description: Retrieve a list of all branches from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of branches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
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
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 */
router.post("/", validateRequest(branchSchema), createBranch);

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
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Branch not found.
 */
router.put("/:id", validateRequest(branchSchema), updateBranch);

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
