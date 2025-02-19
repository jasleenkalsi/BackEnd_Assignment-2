import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { AppError } from "../middleware/errorHandler";

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json({ success: true, message: "Employees retrieved", data: employees });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return next(new AppError("Employee not found", 404));
    }

    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

export const addEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body);
    res.status(201).json({ success: true, message: "Employee added successfully", data: newEmployee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedEmployee = await employeeService.updateEmployee(String(id), req.body);
    
    if (!updatedEmployee) {
      return next(new AppError("Employee not found", 404));
    }
    
    res.status(200).json({ success: true, message: "Employee updated successfully", data: updatedEmployee });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await employeeService.deleteEmployee(String(id));
    
    if (!success) {
      return next(new AppError("Employee not found", 404));
    }
    
    res.status(200).json({ success: true, message: `Employee with ID ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
