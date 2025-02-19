import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { AppError } from "../middleware/errorHandler";

// 🔹 Get All Branches
export const getAllBranches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branches = await branchService.getAllBranches(); // ✅ Ensure async call
    res.status(200).json({ data: branches });
  } catch (error) {
    next(error);
  }
};

// 🔹 Get a Branch by ID
export const getBranchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const branch = await branchService.getBranchById(id); // ✅ Firestore uses string IDs

    if (!branch) {
      throw new AppError("Branch not found", 404);
    }

    res.status(200).json({ message: `Branch with ID ${id} retrieved`, data: branch });
  } catch (error) {
    next(error);
  }
};

// 🔹 Create a Branch
export const createBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      throw new AppError("Missing required fields", 400);
    }

    const newBranch = await branchService.createBranch({ name, address, phone });

    res.status(201).json({
      message: "Branch created successfully",
      data: { id: newBranch.id } // ✅ Ensure response follows `{ data: { id: ... } }`
    });
  } catch (error) {
    next(error);
  }
};

// 🔹 Update a Branch
export const updateBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedBranch = await branchService.updateBranch(id, req.body); // ✅ Firestore ID is a string

    if (!updatedBranch) {
      throw new AppError("Branch not found", 404);
    }

    res.status(200).json({ message: `Branch with ID ${id} updated successfully`, data: updatedBranch });
  } catch (error) {
    next(error);
  }
};

// 🔹 Delete a Branch
export const deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const success = await branchService.deleteBranch(id); // ✅ Firestore ID is a string

    if (!success) {
      throw new AppError("Branch not found", 404);
    }

    res.status(200).json({ message: `Branch with ID ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
