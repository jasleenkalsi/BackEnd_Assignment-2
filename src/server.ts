import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "../config/swagger";
import branchRoutes from "./api/v1/routes/branchRoutes";
import employeeRoutes from "./api/v1/routes/employeeRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// API Routes
app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/employees", employeeRoutes);

// Setup Swagger Documentation
setupSwagger(app);

// Error Handling Middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
