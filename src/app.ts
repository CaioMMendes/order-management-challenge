import express from "express"
import { routes } from "./routes/routes.js"
import cors from "cors"
import "dotenv/config"
import { errorMiddleware } from "./middlewares/error.middleware.js"

export const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
)

app.use(express.json())

app.use(routes)

app.use(express.json())

app.use(errorMiddleware)
