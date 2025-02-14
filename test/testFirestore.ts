import { createDocument, getDocumentById, updateDocument, deleteDocument } from "../src/api/v1/repository/firestoreRepository";
import { db } from "../config/firebase"; // Ensure correct Firebase config import

describe("Firestore Repository Tests", () => {
  let testDocId: string;

  beforeAll(async () => {
    testDocId = await createDocument("employees", {
      name: "Jasleen",
      email: "jasleen@example.com",
      position: "Software Engineer",
    });
  });

  test("Should retrieve the created document", async () => {
    const doc = await getDocumentById("employees", testDocId);
    expect(doc).toBeDefined();
    expect(doc?.data()?.name).toBe("Jasleen");
  });

  test("Should update the document", async () => {
    await updateDocument("employees", testDocId, { position: "Senior Engineer" });
    const updatedDoc = await getDocumentById("employees", testDocId);
    expect(updatedDoc?.data()?.position).toBe("Senior Engineer");
  });

  test("Should delete the document", async () => {
    await deleteDocument("employees", testDocId);
    const deletedDoc = await getDocumentById("employees", testDocId);
    expect(deletedDoc).toBeNull();
  });
});
