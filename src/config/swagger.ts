import swaggerJsdoc from "swagger-jsdoc"

export const SWAGGER_CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

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
      {
        url: "https://order-management-challenge.vercel.app/",
        description: "Teste Técnico API",
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
