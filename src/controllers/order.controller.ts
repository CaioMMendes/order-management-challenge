import { Request, Response } from "express"
import { OrderService } from "@/services/order.service"
import { OrderState } from "@/models/order.model"
import { HttpError } from "@/errors/http.error"

const orderService = new OrderService()

export class OrderController {
  async create(req: Request, res: Response) {
    const order = await orderService.create(req.body)

    return res.status(201).json(order)
  }

  async list(req: Request, res: Response) {
    const { page, limit, state } = req.query

    //todo rever os anys
    const params: any = {}

    if (page !== undefined) params.page = Number(page)
    if (limit !== undefined) params.limit = Number(limit)
    if (state !== undefined) params.state = state as OrderState

    const result = await orderService.list(params)

    return res.status(200).json(result)
  }

  async advance(req: Request, res: Response) {
    const { id } = req.params

    const order = await orderService.advance(id)

    return res.json(order)
  }
}
