import { Branch } from '../models/branchModel';
import { db } from "../../../../config/firebase";

let branches: Branch[] = [
  { 
    id: "1", 
    name: 'Vancouver Branch',
    address: '1300 Burrard St, Vancouver, BC, V6Z 2C7',
    phone: '604-456-0022' 
  },
  { 
    id: "2",
    name: 'Edmonton Branch', 
    address: '7250 82 Ave NW, Edmonton, AB, T6B 0G4', 
    phone: '780-468-6800' 
  },
  { 
    id: "3", 
    name: 'Arborg Branch', 
    address: '317-A Fisher Road, Arborg, MB, R0C 0A0',
    phone: '204-555-3461'
  },
  { 
    id: "4", 
    name: 'Regina Branch', 
    address: '3085 Albert, Regina, SK, S4S 0B1', 
    phone: '206-640-2877' 
  },
  { 
    id: "5", 
    name: 'Winnipeg Branch', 
    address: '1 Portage Ave, Winnipeg, MB, R3B 2B9', 
    phone: '204-988-2402' 
  },
  { 
    id: "6", 
    name: 'Steinbach Branch', 
    address: '330 Main St, Steinbach, MB, R5G 1Z1', 
    phone: '204-326-3495' 
  },
  { 
    id: "7", 
    name: 'Montréal Branch', 
    address: '511 Rue Jean-Talon O, Montréal, QC, H3N 1R5', 
    phone: '514-277-5511' 
  },
  { 
    id:"8", 
    name: 'Toronto Branch', 
    address: '440 Queen St W, Toronto, ON, M5V 2A8', 
    phone: '416-980-2500' 
  },
  { 
    id: "9", 
    name: 'Saint John Branch', 
    address: '500 Fairville Blvd, Saint John, NB, E2M 5H7', 
    phone: '506-632-0225' 
  },
  { 
    id: "10", 
    name: 'Headingley Branch', 
    address: '500 McIntosh Rd, Headingley, MB, R4H 1B6', 
    phone: '204-999-5555' 
  }
];

/** 🔹 Get All Branches (Firestore) */
export const getAllBranches = async (): Promise<Branch[]> => {
  try {
    const snapshot = await db.collection("branches").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Branch[];
  } catch (error) {
    console.error(`Failed to retrieve branches: ${error}`);
    throw new Error("Failed to retrieve branches");
  }
};

/** 🔹 Get Branch by ID (Firestore) */
export const getBranchById = async (id: string): Promise<Branch | null> => {
  try {
    const doc = await db.collection("branches").doc(id).get();
    return doc.exists ? ({ id, ...doc.data() } as Branch) : null;
  } catch (error) {
    console.error(`Failed to retrieve branch (ID: ${id}): ${error}`);
    throw new Error(`Failed to retrieve branch with ID: ${id}`);
  }
};

/** 🔹 Create a Branch (Firestore) */
export const createBranch = async (branchData: { name: string; address: string; phone: string }) => {
  try {
    const branchRef = db.collection("branches").doc(); // ✅ Firestore generates unique string ID
    await branchRef.set(branchData);
    return { id: branchRef.id, ...branchData }; // ✅ Ensure response includes `id`
  } catch (error) {
    console.error(`Failed to create branch: ${error}`);
    throw new Error("Failed to create branch");
  }
};
/** 🔹 Update Branch (Firestore) */
export const updateBranch = async (id: string, updatedData: Partial<Branch>): Promise<Branch | null> => {
  try {
    const branchRef = db.collection("branches").doc(id);
    const doc = await branchRef.get();

    if (!doc.exists) return null;

    // 🔹 Get current data before updating to ensure required fields exist
    const existingData = doc.data() as Branch;

    // 🔹 Merge existing data with new updates while ensuring required fields exist
    const cleanedData = {
      name: updatedData.name ?? existingData.name,
      address: updatedData.address ?? existingData.address,
      phone: updatedData.phone ?? existingData.phone,
    };

    await branchRef.update(cleanedData); // ✅ Firestore expects a plain object

    return { id, ...cleanedData }; // ✅ Returns an updated Branch object
  } catch (error: any) {
    console.error(`Failed to update branch (ID: ${id}): ${error.message}`);
    throw new Error(`Failed to update branch with ID: ${id}`);
  }
};


/** 🔹 Delete a Branch (Firestore) */
export const deleteBranch = async (id: string): Promise<boolean> => {
  try {
    const branchRef = db.collection("branches").doc(id);
    const doc = await branchRef.get();

    if (!doc.exists) return false;

    await branchRef.delete();
    return true;
  } catch (error) {
    console.error(`Failed to delete branch (ID: ${id}): ${error}`);
    throw new Error(`Failed to delete branch with ID: ${id}`);
  }
};