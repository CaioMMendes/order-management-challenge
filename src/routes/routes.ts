import { Router } from "express"
import { swaggerSpec } from "@/config/swagger"
import swaggerUi from "swagger-ui-express"

import { authRoutes } from "@/routes/auth.routes"

const routes = Router()

routes.use("/auth", authRoutes)
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { routes }
