import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee API",
      version: "1.0.0",
      description: "API documentation for Employee management system",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/routes/employeeRoutes.ts"], // Adjust the path as needed
};

// Generate Swagger Docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Function to setup Swagger in Express
const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger Docs available at http://localhost:3001/api-docs");
};

export default setupSwagger;