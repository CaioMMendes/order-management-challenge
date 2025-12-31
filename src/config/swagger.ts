import swaggerJsdoc from "swagger-jsdoc"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
        url: "https://order-management-challenge.vercel.app/",
        description: "Teste Técnico API",
      },
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
  apis: [`${__dirname}/../routes/*.ts`],
}

export const swaggerSpec = swaggerJsdoc(options)
