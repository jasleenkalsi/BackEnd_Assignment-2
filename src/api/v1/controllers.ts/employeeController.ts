// src/api/v1/controllers/employee.controller.ts
import { Request, Response } from 'express';
import { Employee } from '../services/employeeService';

export class EmployeeController {
  static async createEmployee(req: Request, res: Response) {
    const { name, position, department, email, phone, branchId } = req.body;

    // Simulating DB insert operation (for now using in-memory data)
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name,
      position,
      department,
      email,
      phone,
      branchId,
    };

    // In a real application, you would save it to a database here
    res.status(201).json(newEmployee);
  }
}
