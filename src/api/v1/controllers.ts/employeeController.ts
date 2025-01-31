import { Request, Response } from "express";
import * as employeeService from 'src/api/v1/services/employeeService';

// Get all employees
export const getAllEmployees = (req: Request, res: Response): void => {
    try {
        const employees = employeeService.getAllEmployees();
        res.status(200).json({ message: "Employees retrieved", data: employees });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving employees" });
    }
};

// Get an employee by ID
export const getEmployeeById = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const employee = employeeService.getEmployeeById(Number(id)); // Ensure ID is a number
        if (employee) {
            res.status(200).json({ message: "Employee retrieved", data: employee });
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving employee" });
    }
};

// Add a new employee
export const addEmployee = (req: Request, res: Response): void => {
    try {
        const newEmployee = req.body;
        const createdEmployee = employeeService.createEmployee(newEmployee);
        res.status(201).json({ message: "Employee added", data: createdEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error adding employee" });
    }
};

// Update an existing employee
export const updateEmployee = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedEmployee = employeeService.updateEmployee(Number(id), updatedData);
        if (updatedEmployee) {
            res.status(200).json({ message: "Employee updated", data: updatedEmployee });
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
            res.status(200).json({ message: "Employee deleted" });
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee" });
    }
};
