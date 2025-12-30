import { Router } from "express"
import { OrderController } from "./../controllers/order.controller"
import { authMiddleware } from "@/middlewares/auth.middleware"

const orderRoutes = Router()
const controller = new OrderController()

orderRoutes.use(authMiddleware)

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Listar pedidos com paginação e filtro por estado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *           enum: [CREATED, ANALYSIS, COMPLETED]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       lab:
 *                         type: string
 *                       patient:
 *                         type: string
 *                       customer:
 *                         type: string
 *                       state:
 *                         type: string
 *                         enum: [CREATED, ANALYSIS, COMPLETED]
 *                       status:
 *                         type: string
 *                         enum: [ACTIVE, DELETED]
 *                       services:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             value:
 *                               type: number
 *                             status:
 *                               type: string
 *                               enum: [PENDING, DONE]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Não autorizado
 */
orderRoutes.get("/", controller.list)

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lab
 *               - patient
 *               - customer
 *               - services
 *             properties:
 *               lab:
 *                 type: string
 *                 example: Laboratório Central
 *               patient:
 *                 type: string
 *                 example: João da Silva
 *               customer:
 *                 type: string
 *                 example: Hospital X
 *               services:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - value
 *                     - status
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Hemograma Completo
 *                     value:
 *                       type: number
 *                       example: 120.5
 *                     status:
 *                       type: string
 *                       enum: [PENDING, DONE]
 *                       example: PENDING
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64f9c2d4c9e1a7b8c1234567
 *                 lab:
 *                   type: string
 *                 patient:
 *                   type: string
 *                 customer:
 *                   type: string
 *                 state:
 *                   type: string
 *                   enum: [CREATED, ANALYSIS, COMPLETED]
 *                   example: CREATED
 *                 status:
 *                   type: string
 *                   enum: [ACTIVE, DELETED]
 *                   example: ACTIVE
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       value:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: [PENDING, DONE]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Erro de validação de negócio
 *       401:
 *         description: Não autorizado
 */
orderRoutes.post("/", controller.create)

/**
 * @swagger
 * /orders/{id}/advance:
 *   patch:
 *     summary: Avança o estado do pedido
 *     description: >
 *       Avança o pedido para o próximo estado seguindo o fluxo:
 *       CREATED → ANALYSIS → COMPLETED.
 *       Não é permitido pular etapas ou avançar um pedido já concluído.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 lab:
 *                   type: string
 *                 patient:
 *                   type: string
 *                 customer:
 *                   type: string
 *                 state:
 *                   type: string
 *                   enum: [CREATED, ANALYSIS, COMPLETED]
 *                 status:
 *                   type: string
 *                   enum: [ACTIVE, DELETED]
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       value:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: [PENDING, DONE]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Transição de estado inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order already completed
 *       401:
 *         description: Não autorizado (token ausente ou inválido)
 *       404:
 *         description: Pedido não encontrado
 */
orderRoutes.patch("/:id/advance", controller.advance)

export { orderRoutes }
