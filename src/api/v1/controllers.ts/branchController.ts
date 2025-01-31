import { Request, Response } from 'express';
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from '../services/branchService';
import { Branch } from '../models/branchModel';

// Create a new branch
export const createBranchController = (req: Request, res: Response): void => {
  const branchData: Branch = req.body;
  const newBranch = createBranch(branchData);
  res.status(201).json(newBranch);
};

// Get all branches
export const getAllBranchesController = (_req: Request, res: Response): void => {
  const branches = getAllBranches();
  res.status(200).json(branches);
};

// Get branch by ID
export const getBranchByIdController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const branch = getBranchById(Number(id));
  if (!branch) {
    res.status(404).send('Branch not found');
  } else {
    res.status(200).json(branch);
  }
};

// Update a branch
export const updateBranchController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updatedData: Partial<Branch> = req.body;
  const updatedBranch = updateBranch(Number(id), updatedData);
  if (!updatedBranch) {
    res.status(404).send('Branch not found');
  } else {
    res.status(200).json(updatedBranch);
  }
};

// Delete a branch
export const deleteBranchController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const isDeleted = deleteBranch(Number(id));
  if (!isDeleted) {
    res.status(404).send('Branch not found');
  } else {
    res.status(204).send();
  }
};
