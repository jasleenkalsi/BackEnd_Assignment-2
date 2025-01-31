import express from "express";
import setupSwagger from "../config/swagger"; // Import Swagger setup

const app = express();

// Middleware
app.use(express.json());

// Setup Swagger
setupSwagger(app);

export default app;