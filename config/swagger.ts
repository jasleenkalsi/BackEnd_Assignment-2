import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Comprehensive API documentation including request parameters, responses, authentication, and security details.",
  },
  servers: [
    {
      url: "http://localhost:3003",
      description: "Local Development Server",
    },
    {
      url: "https://your-deployed-api.com",
      description: "Production Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/api/v1/routes/*.ts"], // ✅ Ensure path matches your route files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerSpec; // Export the spec for OpenAPI JSON file generation
