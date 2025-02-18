import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { AppError } from "../middleware/errorHandler";

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
    const updatedEmployee = await employeeService.updateEmployee(String(id), req.body); // ✅ FIXED HERE
    
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
    const success = await employeeService.deleteEmployee(String(id)); // ✅ FIXED HERE
    
    if (!success) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: `Employee with ID ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      console.log("🚨 Debug: Employee not found"); // ✅ Debug log
      return res.status(404).json({
        success: false, // ✅ Ensure response has `success: false`
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};
