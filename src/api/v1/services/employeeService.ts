
import { Employee } from "../models/employeeModel";  


const employee: Employee[] = [
    {
        id: 1,
        name: "Alice Johnson",
        position: "Branch Manager",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148",
        branchId: 1,
    },
    {
        id: 2,
        name: "Amandeep Singh",
        position: "Customer Service Representative",
        department: "Customer Service",
        email: "amandeep.singh@pixell-river.com",
        phone: "780-555-0172",
        branchId: 2,
    },
    {
        id: 3,
        name: "Maria Garcia",
        position: "Loan Officer",
        department: "Loans",
        email: "maria.garcia@pixell-river.com",
        phone: "204-555-0193",
        branchId: 3,
    },
    {
        id: 4,
        name: "James Wilson",
        position: "IT Support Specialist",
        department: "IT",
        email: "james.wilson@pixell-river.com",
        phone: "604-555-0134",
        branchId: 1,
    },
    {
        id: 5,
        name: "Linda Martinez",
        position: "Financial Advisor",
        department: "Advisory",
        email: "linda.martinez@pixell-river.com",
        phone: "780-555-0165",
        branchId: 2,
    },
    {
        id: 6,
        name: "Michael Brown",
        position: "Teller",
        department: "Operations",
        email: "michael.brown@pixell-river.com",
        phone: "204-555-0187",
        branchId: 3,
    },
    {
        id: 7,
        name: "Patricia Taylor",
        position: "Operations Manager",
        department: "Operations",
        email: "patricia.taylor@pixell-river.com",
        phone: "204-555-0204",
        branchId: 3,
    },

    {
        id: 8,
        name: "	Chen Wei",
        position: "Senior Loan Officer",
        department: "Loans",
        email: "chen.wei@pixell-river.com",
        phone: "204-555-0218",
        branchId: 5,
    },

    
];


let employees: Employee[] = [];

// Get all employees
export const getAllEmployees = (): Employee[] => {
    return employees;
};

// Get an employee by ID
export const getEmployeeById = (id: number): Employee | undefined => {
    return employees.find(employee => employee.id === id);
};

// Create a new employee
export const createEmployee = (newEmployee: Employee): Employee => {
    newEmployee.id = employees.length + 1;  // Simple logic for generating unique IDs
    employees.push(newEmployee);
    return newEmployee;
};

// Update an existing employee
export const updateEmployee = (id: number, updatedData: Partial<Employee>): Employee | undefined => {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) return undefined;
    employees[index] = { ...employees[index], ...updatedData };
    return employees[index];
};

// Delete an employee
export const deleteEmployee = (id: number): boolean => {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) return false;
    employees.splice(index, 1);
    return true;
};
