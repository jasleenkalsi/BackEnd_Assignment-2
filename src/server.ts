import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "../config/swagger"; // ✅ Use only setupSwagger function
import branchRoutes from "./api/v1/routes/branchRoutes";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import helmet from "helmet";
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003; // ✅ Use environment variable for port

// Middleware
app.use(express.json());
app.use(helmet());

// API Routes
app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/employees", employeeRoutes);

// Setup Swagger Documentation
setupSwagger(app); // ✅ This should already serve Swagger UI

a

// Error Handling Middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
