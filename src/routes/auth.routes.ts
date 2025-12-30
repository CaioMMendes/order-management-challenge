import { Router } from "express"
import { AuthController } from "../controllers/auth.controller.js"

const authRoutes = Router()
const controller = new AuthController()

/**
 *  @swagger
 * paths:
 *  /auth/register:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Registrar usuário
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  example: caio@teste.com
 *                password:
 *                  type: string
 *                  example: teste123
 *      responses:
 *        201:
 *          description: Usuário registrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *        400:
 *          description: Usuário já existe
 */
authRoutes.post("/register", controller.register)

/**
 *  @swagger
 * /auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Login do usuário
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  example: caio@teste.com
 *                password:
 *                  type: string
 *                  example: teste123
 *      responses:
 *        200:
 *          description: Login realizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *        401:
 *          description: Credenciais inválidas
 */
authRoutes.post("/login", controller.login)

/**
 * @swagger
 * /auth/teste:
 *   get:
 *     summary: Rota de teste
 *     tags:
 *       - teste
 *     responses:
 *       200:
 *         description: rota de teste funcionando
 */
authRoutes.get("/teste", (req, res) => {
  return res.json({ message: "rota de teste funcionando" })
})

authRoutes.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" })
})

export { authRoutes }
