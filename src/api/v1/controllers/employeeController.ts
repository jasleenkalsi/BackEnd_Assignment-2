import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json({ message: "Employees retrieved", data: employees });
  } catch (error) {
    next(error);
  }
};

// Add a new employee
export const addEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body);
    res.status(201).json({
      message: "Employee added successfully",
      data: newEmployee,
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing employee
export const updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedEmployee = await employeeService.updateEmployee(Number(id), req.body);
    
    if (!updatedEmployee) {
      res.status(404).json({ message: "Employee not found" });
      return;
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
export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await employeeService.deleteEmployee(Number(id));
    
    if (!success) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: `Employee with ID ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
