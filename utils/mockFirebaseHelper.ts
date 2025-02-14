import { Firestore } from "@google-cloud/firestore";

/**
 * Mock Firestore class to simulate Firestore interactions in tests.
 */
class MockFirestore {
  collections: { [key: string]: any } = {};

  collection(name: string) {
    if (!this.collections[name]) {
      this.collections[name] = new MockCollection(name);
    }
    return this.collections[name];
  }
}

/**
 * Mock Firestore Collection class
 */
class MockCollection {
  name: string;
  documents: { [key: string]: any } = {};

  constructor(name: string) {
    this.name = name;
  }

  async add(data: any) {
    const id = Math.random().toString(36).substring(7); // Generate a random ID
    this.documents[id] = { id, ...data };
    return { id, get: () => Promise.resolve({ exists: true, id, data: () => this.documents[id] }) };
  }

  async doc(id: string) {
    return new MockDocument(this, id);
  }

  async get() {
    const docs = Object.keys(this.documents).map((id) => ({
      id,
      data: () => this.documents[id],
    }));
    return { docs };
  }
}

/**
 * Mock Firestore Document class
 */
class MockDocument {
  collection: MockCollection;
  id: string;

  constructor(collection: MockCollection, id: string) {
    this.collection = collection;
    this.id = id;
  }

  async get() {
    const data = this.collection.documents[this.id];
    return { exists: !!data, id: this.id, data: () => data };
  }

  async set(data: any) {
    this.collection.documents[this.id] = { id: this.id, ...data };
    return;
  }

  async update(data: any) {
    if (!this.collection.documents[this.id]) {
      throw new Error("Document does not exist");
    }
    this.collection.documents[this.id] = { ...this.collection.documents[this.id], ...data };
    return;
  }

  async delete() {
    delete this.collection.documents[this.id];
    return;
  }
}

/**
 * Mock Firestore instance for unit testing
 */
const mockFirestore = new MockFirestore();
export { mockFirestore, MockFirestore };
