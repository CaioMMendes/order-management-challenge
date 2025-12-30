import { Router } from "express"
import { swaggerSpec } from "../config/swagger.js"
import swaggerUi from "swagger-ui-express"

import { authRoutes } from "./auth.routes.js"
import { orderRoutes } from "./order.routes.js"

const routes = Router()

routes.use("/auth", authRoutes)
routes.use("/orders", orderRoutes)
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { routes }
