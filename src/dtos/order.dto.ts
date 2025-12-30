import {
  OrderState,
  OrderStatus,
  ServiceStatus,
} from "../models/order.model.js"

export interface CreateServiceDTO {
  name: string
  value: number
  status?: ServiceStatus
}

export interface CreateOrderDTO {
  lab: string
  patient: string
  customer: string
  services: CreateServiceDTO[]
}

export interface ListOrdersDTO {
  page?: number
  limit?: number
  state?: OrderState
}

export interface OrderResponseDTO {
  id: string
  lab: string
  patient: string
  customer: string
  state: OrderState
  status: OrderStatus
  services: {
    name: string
    value: number
    status: ServiceStatus
  }[]
  createdAt: Date
}
