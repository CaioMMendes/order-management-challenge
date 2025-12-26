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
  },
  apis: ["./src/routes/*.ts"], // onde estão suas rotas
}

export const swaggerSpec = swaggerJsdoc(options)
