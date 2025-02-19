import { getFirestore, Firestore } from "firebase-admin/firestore";

/** 🔹 Initialize Firestore (Ensures `db` is correctly referenced) */
const db: Firestore = getFirestore();

/** 🔹 Custom Error Classes */
class RepositoryError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "RepositoryError";
	}
}

class ServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ServiceError";
	}
}

/** 🔹 Executes Firestore Transaction */
export const runTransaction = async <T>(
	operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
	try {
		return await db.runTransaction(operations);
	} catch (error: any) {
		console.error("Transaction failed:", error.message);
		throw new RepositoryError("Transaction execution failed");
	}
};

/** 🔹 Creates a New Firestore Document */
export const createDocument = async <T extends FirebaseFirestore.DocumentData>(
	collectionName: string,
	data: Partial<T>,
	id?: string
): Promise<string> => {
	try {
		let docRef: FirebaseFirestore.DocumentReference<T>;

		if (id) {
			docRef = db.collection(collectionName).doc(id) as FirebaseFirestore.DocumentReference<T>;
			await docRef.set(data as T);
		} else {
			docRef = await db.collection(collectionName).add(data) as FirebaseFirestore.DocumentReference<T>;
		}

		return docRef.id;
	} catch (error: any) {
		console.error(`Failed to create document in ${collectionName}:`, error.message);
		throw new RepositoryError("Failed to create document");
	}
};

/** 🔹 Retrieves All Firestore Documents */
export const getDocuments = async <T extends FirebaseFirestore.DocumentData>(
	collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot<T>> => {
	try {
		return await db.collection(collectionName).get() as FirebaseFirestore.QuerySnapshot<T>;
	} catch (error: any) {
		console.error(`Failed to fetch documents from ${collectionName}:`, error.message);
		throw new RepositoryError("Failed to retrieve documents");
	}
};

/** 🔹 Retrieves a Firestore Document by ID */
export const getDocumentById = async <T extends FirebaseFirestore.DocumentData>(
	collectionName: string,
	id: string
): Promise<FirebaseFirestore.DocumentSnapshot<T> | null> => {
	try {
		const doc = await db.collection(collectionName).doc(id).get() as FirebaseFirestore.DocumentSnapshot<T>;
		return doc.exists ? doc : null;
	} catch (error: any) {
		console.error(`Failed to fetch document ${id} from ${collectionName}:`, error.message);
		throw new RepositoryError("Document retrieval failed");
	}
};

/** 🔹 Updates an Existing Firestore Document */
export const updateDocument = async <T extends FirebaseFirestore.DocumentData>(
	collectionName: string,
	id: string,
	data: Partial<T>
): Promise<void> => {
	try {
		// 🔹 Ensure no `undefined` values are passed to Firestore
		const cleanedData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));

		await db.collection(collectionName).doc(id).update(cleanedData);
	} catch (error: any) {
		console.error(`Failed to update document ${id} in ${collectionName}:`, error.message);
		throw new RepositoryError("Document update failed");
	}
};

/** 🔹 Deletes a Firestore Document */
export const deleteDocument = async (
	collectionName: string,
	id: string,
	transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
	try {
		const docRef = db.collection(collectionName).doc(id);
		if (transaction) {
			transaction.delete(docRef);
		} else {
			await docRef.delete();
		}
	} catch (error: any) {
		console.error(`Failed to delete document ${id} from ${collectionName}:`, error.message);
		throw new RepositoryError("Document deletion failed");
	}
};
