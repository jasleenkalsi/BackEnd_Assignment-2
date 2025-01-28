import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0', // OpenAPI version
    info: {
        title: 'Backend Assignment API', // API title
        version: '1.0.0', // API version
        description: 'API documentation for Backend Assignment 2', // Description
    },
    servers: [
        {
            url: 'http://localhost:3001', // Your API base URL
        },
    ],
};

const options = {
    definition: swaggerDefinition,
    apis: ['./src/routes/.ts'], // Path to your API routes for Swagger comments
};

const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;
