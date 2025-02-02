import express from "express";
import morgan from "morgan";
import { setupSwagger} from "../config/swagger";
import employeeRoutes from "./api/v1/routes/employeeRoutes"; 
import branchRoutes from './api/v1/routes/branchRoutes';


const app = express();

app.use(express.json());

app.use(morgan("combined"));

// Mount API routes
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/employees', employeeRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Setup Swagger
setupSwagger(app);

export default app;
