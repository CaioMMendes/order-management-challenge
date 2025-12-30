import { describe, it, expect, vi, beforeEach } from "vitest"
import { OrderService } from "../order.service"
import { OrderState } from "@/models/order.model"
import { HttpError } from "@/errors/http.error"
import { OrderModel } from "@/models/order.model"

vi.mock("@/models/order.model", () => {
  return {
    OrderModel: {
      findById: vi.fn(),
    },
    OrderState: {
      CREATED: "CREATED",
      ANALYSIS: "ANALYSIS",
      COMPLETED: "COMPLETED",
    },
  }
})

describe("OrderService.advance", () => {
  const service = new OrderService()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should throw error if orderId is undefined", async () => {
    await expect(service.advance(undefined)).rejects.toBeInstanceOf(HttpError)
  })

  it("should block advance if order is already COMPLETED", async () => {
    vi.mocked(OrderModel.findById).mockResolvedValue({
      state: OrderState.COMPLETED,
    } as any)

    await expect(service.advance("123")).rejects.toMatchObject({
      statusCode: 400,
      message: "Order already completed",
    })
  })

  it("should advance state from CREATED to ANALYSIS", async () => {
    const saveMock = vi.fn()

    const orderMock = {
      state: OrderState.CREATED,
      save: saveMock,
    }

    vi.mocked(OrderModel.findById).mockResolvedValue(orderMock as any)

    const result = await service.advance("123")

    expect(result.state).toBe(OrderState.ANALYSIS)
    expect(saveMock).toHaveBeenCalled()
  })

  it("should advance state from ANALYSIS to COMPLETED", async () => {
    const saveMock = vi.fn()

    const orderMock = {
      state: OrderState.ANALYSIS,
      save: saveMock,
    }

    vi.mocked(OrderModel.findById).mockResolvedValue(orderMock as any)

    const result = await service.advance("123")

    expect(result.state).toBe(OrderState.COMPLETED)
    expect(saveMock).toHaveBeenCalled()
  })
})
