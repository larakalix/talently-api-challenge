import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "API documentation with Swagger",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: [
        "./src/routes/auth/auth.route.ts",
        "./src/routes/task/task.route.ts",
    ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
