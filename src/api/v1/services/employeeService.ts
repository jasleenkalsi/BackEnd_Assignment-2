import { db } from "../../../../config/firebase";
import { Employee } from "../models/employeeModel";  


const employee: Employee[] = [
    {
        id: "1",
        name: "Alice Johnson",
        position: "Branch Manager",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148",
        branchId: 1,
    },
    {
        id: "2",
        name: "Amandeep Singh",
        position: "Customer Service Representative",
        department: "Customer Service",
        email: "amandeep.singh@pixell-river.com",
        phone: "780-555-0172",
        branchId: 2,
    },
    {
        id: "3",
        name: "Maria Garcia",
        position: "Loan Officer",
        department: "Loans",
        email: "maria.garcia@pixell-river.com",
        phone: "204-555-0193",
        branchId: 3,
    },
    {
        id: "4",
        name: "James Wilson",
        position: "IT Support Specialist",
        department: "IT",
        email: "james.wilson@pixell-river.com",
        phone: "604-555-0134",
        branchId: 1,
    },
    {
        id: "5",
        name: "Linda Martinez",
        position: "Financial Advisor",
        department: "Advisory",
        email: "linda.martinez@pixell-river.com",
        phone: "780-555-0165",
        branchId: 2,
    },
    {
        id:"6",
        name: "Michael Brown",
        position: "Teller",
        department: "Operations",
        email: "michael.brown@pixell-river.com",
        phone: "204-555-0187",
        branchId: 3,
    },
    {
        id: "7",
        name: "Patricia Taylor",
        position: "Operations Manager",
        department: "Operations",
        email: "patricia.taylor@pixell-river.com",
        phone: "204-555-0204",
        branchId: 3,
    },

    {
        id: "8",
        name: "	Chen Wei",
        position: "Senior Loan Officer",
        department: "Loans",
        email: "chen.wei@pixell-river.com",
        phone: "204-555-0218",
        branchId: 5,
    },

    
];

/** 🔹 Get All Employees (Firestore) */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
      const snapshot = await db.collection("employees").get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Employee[];
    } catch (error) {
      console.error(`Failed to retrieve employees: ${error}`);
      throw new Error("Failed to retrieve employees");
    }
  };
  
  /** 🔹 Get Employee by ID (Firestore) */
  export const getEmployeeById = async (id: string): Promise<Employee | null> => {
    try {
      const doc = await db.collection("employees").doc(id).get();
      
      if (!doc.exists) {
        console.log(`🚨 Debug: Employee with ID ${id} not found.`);
        return null; // ✅ Ensure `null` is returned
      }
  
      console.log(`✅ Debug: Found Employee`, doc.data());
      return { id, ...doc.data() } as Employee;
    } catch (error) {
      console.error(`Failed to retrieve employee (ID: ${id}): ${error}`);
      throw new Error(`Failed to retrieve employee with ID: ${id}`);
    }
  };
  
  
  
  /** 🔹 Create Employee (Firestore) */
  export const createEmployee = async (employeeData: Omit<Employee, "id">) => {
    try {
      const employeeRef = db.collection("employees").doc();
      await employeeRef.set(employeeData);
      return { id: employeeRef.id, ...employeeData }; // ✅ Return with ID
    } catch (error) {
      console.error(`Failed to create employee: ${error}`);
      throw new Error("Failed to create employee");
    }
  };
  
  /** 🔹 Update Employee (Firestore) */
  export const updateEmployee = async (id: string, updatedData: Partial<Employee>): Promise<Employee | null> => {
    try {
      const employeeRef = db.collection("employees").doc(id);
      const doc = await employeeRef.get();
  
      if (!doc.exists) {
        console.error(`Employee not found: ${id}`);
        return null;
      }
  
      const existingData = doc.data() as Employee;
  
      if (Object.keys(updatedData).length === 0) {
        console.error(`No valid fields provided for update (ID: ${id})`);
        throw new Error("No valid fields provided for update.");
      }
  
      // 🔹 Merge existing data with provided updates
      const mergedData = {
        name: updatedData.name ?? existingData.name,
        position: updatedData.position ?? existingData.position,
        department: updatedData.department ?? existingData.department,
        email: updatedData.email ?? existingData.email,
        phone: updatedData.phone ?? existingData.phone,
        branchId: updatedData.branchId ?? existingData.branchId,
      };
  
      await employeeRef.update(mergedData);
      return { id, ...mergedData };
    } catch (error: any) {
      console.error(`Failed to update employee (ID: ${id}): ${error.message}`);
      throw new Error(`Failed to update employee with ID: ${id}`);
    }
  };
  
  /** 🔹 Delete Employee (Firestore) */
  export const deleteEmployee = async (id: string): Promise<boolean> => {
    try {
      const employeeRef = db.collection("employees").doc(id);
      const doc = await employeeRef.get();
  
      if (!doc.exists) return false;
  
      await employeeRef.delete();
      return true;
    } catch (error) {
      console.error(`Failed to delete employee (ID: ${id}): ${error}`);
      throw new Error(`Failed to delete employee with ID: ${id}`);
    }
  };