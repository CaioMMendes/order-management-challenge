import { OrderModel, OrderState } from "../models/order.model.js"
import { CreateOrderDTO, ListOrdersDTO } from "../dtos/order.dto.js"
import { HttpError } from "../errors/http.error.js"

const stateFlow: Record<OrderState, OrderState | null> = {
  [OrderState.CREATED]: OrderState.ANALYSIS,
  [OrderState.ANALYSIS]: OrderState.COMPLETED,
  [OrderState.COMPLETED]: null,
}

export class OrderService {
  async create(data: CreateOrderDTO) {
    if (!data.services || data.services.length === 0) {
      throw new HttpError(400, "Order must have at least one service")
    }

    const totalValue = data.services.reduce(
      (sum, service) => sum + service.value,
      0
    )

    if (totalValue <= 0) {
      throw new HttpError(400, "Order total value must be greater than zero")
    }

    const order = await OrderModel.create(data)

    return order
  }

  async list({ page = 1, limit = 10, state }: ListOrdersDTO) {
    const skip = (page - 1) * limit

    const filter: any = {}
    if (state) {
      filter.state = state
    }

    const [orders, total] = await Promise.all([
      OrderModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      OrderModel.countDocuments(filter),
    ])

    return {
      data: orders,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async advance(orderId: string | undefined) {
    if (orderId === undefined) throw new HttpError(404, "Order not found")

    const order = await OrderModel.findById(orderId)

    if (!order) {
      throw new HttpError(404, "Order not found")
    }

    const nextState = stateFlow[order.state]

    if (!nextState) {
      throw new HttpError(400, "Order already completed")
    }

    order.state = nextState
    await order.save()

    return order
  }
}
