import { Router } from "express"
import { swaggerSpec } from "@/config/swagger"
import swaggerUi from "swagger-ui-express"

import { authRoutes } from "@/routes/auth.routes"
import { orderRoutes } from "./order.routes"

const routes = Router()

routes.use("/auth", authRoutes)
routes.use("/orders", orderRoutes)
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { routes }
