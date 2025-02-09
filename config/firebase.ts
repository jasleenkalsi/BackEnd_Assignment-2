import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(require("../../firebase-adminsdk.json"))
});

export const db = admin.firestore();
