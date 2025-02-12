import { db } from "../config/firebase";  // Keep the path relative to config folder

const testFirestore = async () => {
    try {
        const docRef = db.collection("test").doc("sample");
        await docRef.set({ message: "Hello, Firestore!" });

        console.log(" Firestore test document created successfully!");
    } catch (error) {
        console.error(" Firestore error:", error);
    }
};

testFirestore();
