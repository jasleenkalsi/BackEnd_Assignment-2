import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import  serviceAccount from "../back-end-project-3d9fe-firebase-adminsdk-fbsvc-6eb648cacc.json";

// ✅ Fix: Ensure Firebase is initialized once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = getFirestore();
export { db };
