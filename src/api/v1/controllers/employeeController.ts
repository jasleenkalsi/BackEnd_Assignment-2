import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json({ message: "Employees retrieved", data: employees });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

// Add a new employee
export const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body); // 🔥 Fix: Correct function name
    res.status(201).json({
      message: "Employee added successfully",
      data: newEmployee,
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing employee
export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await employeeService.updateEmployee(id, req.body); // 🔥 Fix: Correct function name

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const success = await employeeService.deleteEmployee(id); // 🔥 Fix: Correct function name

    if (!success) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: `Employee with ID ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
