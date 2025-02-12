import { db } from "../../../../config/firebase";
import { FirestoreDataTypes } from "../types/firestore";

interface FieldValuePair {
	fieldName: string;
	fieldValue: FirestoreDataTypes;
}

// Custom Error Classes
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

/**
 * Executes a series of operations within a Firestore transaction.
 * @param {(transaction: FirebaseFirestore.Transaction) => Promise<T>} operations - Function containing the operations to perform within the transaction.
 * @returns {Promise<T>} - The result of the transaction.
 */
export const runTransaction = async <T>(
	operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
	try {
		return await db.runTransaction(operations);
	} catch (error) {
		console.error("Transaction failed:", error);
		throw new RepositoryError("Transaction execution failed");
	}
};

/**
 * Creates a new document in a Firestore collection.
 * @param {string} collectionName - The collection name.
 * @param {Partial<T>} data - The document data.
 * @param {string} [id] - Optional document ID.
 * @returns {Promise<string>} - The ID of the newly created document.
 */
export const createDocument = async <T>(
	collectionName: string,
	data: Partial<T>,
	id?: string
): Promise<string> => {
	try {
		let docRef: FirebaseFirestore.DocumentReference;

		if (id) {
			docRef = db.collection(collectionName).doc(id);
			await docRef.set(data);
		} else {
			docRef = await db.collection(collectionName).add(data);
		}

		return docRef.id;
	} catch (error) {
		console.error(`Failed to create document in ${collectionName}:`, error);
		throw new RepositoryError("Failed to create document");
	}
};

/**
 * Retrieves all documents from a Firestore collection.
 * @param {string} collectionName - The collection name.
 * @returns {Promise<FirebaseFirestore.QuerySnapshot>} - The documents snapshot.
 */
export const getDocuments = async (
	collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
	try {
		return await db.collection(collectionName).get();
	} catch (error) {
		console.error(`Failed to fetch documents from ${collectionName}:`, error);
		throw new RepositoryError("Failed to retrieve documents");
	}
};

/**
 * Retrieves a document by ID.
 * @param {string} collectionName - The collection name.
 * @param {string} id - The document ID.
 * @returns {Promise<FirebaseFirestore.DocumentSnapshot | null>} - The document or null.
 */
export const getDocumentById = async (
	collectionName: string,
	id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
	try {
		const doc = await db.collection(collectionName).doc(id).get();
		return doc.exists ? doc : null;
	} catch (error) {
		console.error(`Failed to fetch document ${id} from ${collectionName}:`, error);
		throw new RepositoryError("Document retrieval failed");
	}
};

/**
 * Updates an existing document.
 * @param {string} collectionName - The collection name.
 * @param {string} id - The document ID.
 * @param {Partial<T>} data - The updated document data.
 * @returns {Promise<void>}
 */
export const updateDocument = async <T>(
	collectionName: string,
	id: string,
	data: Partial<T>
): Promise<void> => {
	try {
		await db.collection(collectionName).doc(id).update(data);
	} catch (error) {
		console.error(`Failed to update document ${id} in ${collectionName}:`, error);
		throw new RepositoryError("Document update failed");
	}
};

/**
 * Deletes a document.
 * @param {string} collectionName - The collection name.
 * @param {string} id - The document ID.
 * @param {FirebaseFirestore.Transaction} [transaction] - Optional Firestore transaction.
 * @returns {Promise<void>}
 */
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
	} catch (error) {
		console.error(`Failed to delete document ${id} from ${collectionName}:`, error);
		throw new RepositoryError("Document deletion failed");
	}
};

/**
 * Deletes documents based on multiple field values.
 * @param {string} collectionName - The collection name.
 * @param {FieldValuePair[]} fieldValuePairs - Field-value pairs to filter on.
 * @param {FirebaseFirestore.Transaction} [transaction] - Optional Firestore transaction.
 * @returns {Promise<void>}
 */
export const deleteDocumentsByFieldValues = async (
	collectionName: string,
	fieldValuePairs: FieldValuePair[],
	transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
	try {
		let query = db.collection(collectionName) as FirebaseFirestore.Query;

		fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
			query = query.where(fieldName, "==", fieldValue);
		});

		let snapshot: FirebaseFirestore.QuerySnapshot;

		if (transaction) {
			snapshot = await transaction.get(query);
			snapshot.docs.forEach((doc) => transaction.delete(doc.ref));
		} else {
			snapshot = await query.get();
			const batch = db.batch();
			snapshot.docs.forEach((doc) => batch.delete(doc.ref));
			await batch.commit();
		}
	} catch (error) {
		const fieldValueString = fieldValuePairs
			.map(({ fieldName, fieldValue }) => `${fieldName} == ${fieldValue}`)
			.join(" AND ");
		console.error(`Failed to delete documents from ${collectionName} where ${fieldValueString}:`, error);
		throw new RepositoryError("Batch document deletion failed");
	}
};
