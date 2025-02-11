import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";



// Get all employees
export const getAllEmployees = (req: Request, res: Response): void => {
  try {
    const employees = employeeService.getAllEmployees();
    res.status(200).json({ message: "Employees retrieved", data: employees });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees" });
  }
};

// Add a new employee
export const addEmployee = (req: Request, res: Response): void => {
    try {
      const newEmployee = employeeService.createEmployee(req.body); // Assuming `newEmployee` has `id` already
      res.status(201).json({
        message: "Employee added successfully",
        data: newEmployee, // Pass `newEmployee` directly, assuming it already contains the `id`
      });
    } catch (error) {
      res.status(500).json({ message: "Error adding employee" });
    }
  };
  
// Update an existing employee
export const updateEmployee = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updatedEmployee = employeeService.updateEmployee(Number(id), req.body);
    if (updatedEmployee) {
      res.status(200).json({
        message: "Employee updated successfully",
        data: updatedEmployee,
      });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating employee" });
  }
};

// Delete an employee
export const deleteEmployee = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const success = employeeService.deleteEmployee(Number(id));
    if (success) {
      res.status(200).json({ message: `Employee with ID ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee" });
  }
};
