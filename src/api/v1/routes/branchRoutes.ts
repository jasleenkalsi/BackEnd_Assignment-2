import { Router } from 'express';
import { createBranchController, getAllBranchesController, getBranchByIdController, updateBranchController, deleteBranchController } from '../controllers.ts/branchController';

const router = Router();

// Create a new branch
router.post('/branches', createBranchController);

// Get all branches
router.get('/branches', getAllBranchesController);

// Get a branch by ID
router.get('/branches/:id', getBranchByIdController);

// Update a branch
router.put('/branches/:id', updateBranchController);

// Delete a branch
router.delete('/branches/:id', deleteBranchController);

export default router;
