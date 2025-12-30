import { Request, Response, NextFunction } from "express"
import { HttpError } from "@/errors/http.error"
import mongoose from "mongoose"

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }
  console.log(err)

  // Erro de validação do Mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors).map((e) => e.message),
    })
  }

  // Erro de cast (ObjectId inválido, tipo errado)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Invalid parameter",
      field: err.path,
    })
  }

  return res.status(500).json({
    message: "Internal server error",
  })
}
