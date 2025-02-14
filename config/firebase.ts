import admin from "firebase-admin";
import path from "path";

// Load Firebase Service Account Key
const serviceAccount = require(path.resolve(__dirname, "./firebase-adminsdk.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firestore.googleapis.com/v1/projects/back-end-project-3d9fe/databases/(default)" 
});

const db = admin.firestore();

export { db };
