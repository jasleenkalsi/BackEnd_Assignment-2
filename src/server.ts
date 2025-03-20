import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "../config/swagger"; // ✅ Use only setupSwagger function
import branchRoutes from "./api/v1/routes/branchRoutes";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import helmet from "helmet";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003; // ✅ Use environment variable for port

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: ["https://jasleenkalsi.github.io/api-docs/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// API Routes
app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/employees", employeeRoutes);

// Setup Swagger Documentation
setupSwagger(app); // ✅ This should already serve Swagger UI

// Error Handling Middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
  console.log("Firebase API Key:", process.env.FIREBASE_API_KEY ? "Loaded ✅" : "Not Loaded ❌");

});
