import { Router } from 'express';
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from '../controllers/branchController';

const router = Router();

// Create a new branch
router.post('/', createBranch);

// Get all branches
router.get('/', getAllBranches);

// Get a branch by ID
router.get('/:id', getBranchById);

// Update a branch
router.put('/:id', updateBranch);

// Delete a branch
router.delete('/:id', deleteBranch);

export default router;
