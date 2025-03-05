import { Response, NextFunction } from "express";
import admin from "firebase-admin";
import { AuthenticatedRequest } from "../types/express"; // Import the custom type

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { uid: decodedToken.uid, role: decodedToken.role };
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
