import { Router } from "express";
import { validate } from "../middleware/validate";
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
 * tags:
 *   name: Branches
 *   description: API endpoints for managing branches
 */

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     description: Retrieve a list of all branches.
 *     responses:
 *       200:
 *         description: List of branches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phone:
 *                     type: string
 */
router.get("/", getAllBranches);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     description: Retrieve details of a branch.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch details.
 *       404:
 *         description: Branch not found.
 */
router.get("/:id", getBranchById);

/**
 * @swagger
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     description: Add a new branch.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
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
 *     tags: [Branches]
 *     description: Modify an existing branch.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
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
 *     tags: [Branches]
 *     description: Remove a branch.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch deleted successfully.
 *       404:
 *         description: Branch not found.
 */
router.delete("/:id", deleteBranch);

export default router;
