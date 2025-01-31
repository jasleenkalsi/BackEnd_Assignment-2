import swaggerJsdoc from "swagger-jsdoc";  // ✅ Corrected import
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
  apis: ["../api/v1/routes/employeeRoutes"],  // ✅ Ensuring all route files are included
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
