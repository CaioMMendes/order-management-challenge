import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API teste técnico",
      version: "1.0.0",
      description: "Documentação da API com Swagger",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)
