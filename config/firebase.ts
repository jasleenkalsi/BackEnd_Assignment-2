import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../back-end-project-3d9fe-firebase-adminsdk-fbsvc-6eb648cacc.json";

initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export { db };
