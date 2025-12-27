import { Request, Response } from "express"
import { AuthService } from "@/services/auth.service"
import { LoginDTO, RegisterDTO } from "@/dtos/auth.dto"

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body

    const result: RegisterDTO = await authService.register({
      email,
      password,
    })

    return res.status(201).json(result)
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const result: LoginDTO = await authService.login({
      email,
      password,
    })

    return res.json(result)
  }
}
