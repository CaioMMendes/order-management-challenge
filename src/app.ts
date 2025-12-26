import express from "express"
import { routes } from "./routes/routes"
import cors from "cors"
import "dotenv/config"
import { errorHandler } from "./middlewares/error.middleware"

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

app.use(errorHandler)
