import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import  serviceAccount from "../back-end-project-3d9fe-firebase-adminsdk-fbsvc-35334a5138.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();
const db = getFirestore();
export {auth, db };
