import { Request, Response,NextFunction } from "express";
import * as branchService from "../services/branchService";

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { name, position, email, branchId } = req.body;

      // Business logic (later replaced with Firestore)
      const newEmployee = { name, position, email, branchId, id: Date.now().toString() };

      return res.status(201).json({ message: 'Employee created', employee: newEmployee });
  } catch (error) {
      next(error);
  }
};

// Get all branches
export const getAllBranches = (req: Request, res: Response): void => {
  try {
    const branches = branchService.getAllBranches();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving branches" });
  }
};

// Get a branch by ID
export const getBranchById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const branch = branchService.getBranchById(Number(id));
    if (branch) {
      res.status(200).json({ message: `Branch with ID ${id} retrieved`, data: branch });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving branch" });
  }
};

// Create a new branch
export const createBranch = (req: Request, res: Response): void => {
  try {
    const newBranch = branchService.createBranch(req.body);
    res.status(201).json({
      id: newBranch.id,
      message: "Branch created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating branch" });
  }
};

// Update a branch
export const updateBranch = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updatedBranch = branchService.updateBranch(Number(id), req.body);
    if (updatedBranch) {
      res.status(200).json({ message: `Branch with ID ${id} updated successfully` });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating branch" });
  }
};

// Delete a branch
export const deleteBranch = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const success = branchService.deleteBranch(Number(id));
    if (success) {
      res.status(200).json({ message: `Branch with ID ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting branch" });
  }
};
