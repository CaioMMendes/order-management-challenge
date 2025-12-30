import { UserModel } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { LoginRequestDTO, RegisterRequestDTO } from "../dtos/auth.dto.js"
import { HttpError } from "../errors/http.error.js"
export class AuthService {
  async register(data: RegisterRequestDTO) {
    if (!data.password || !data.email) {
      throw new HttpError(400, "Email and password are required")
    }

    const userExists = await UserModel.findOne({ email: data.email })
    if (userExists) {
      throw new HttpError(409, "User already exists!")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await UserModel.create({
      email: data.email,
      password: hashedPassword,
    })

    const token = this.generateToken(user.id)

    return { token }
  }

  async login(data: LoginRequestDTO) {
    if (!data.password || !data.email) {
      throw new HttpError(400, "Email and password are required")
    }

    const user = await UserModel.findOne({ email: data.email })
    if (!user) {
      throw new HttpError(401, "Invalid credentials")
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) {
      throw new HttpError(401, "Invalid credentials")
    }

    const token = this.generateToken(user.id)

    return { token }
  }

  private generateToken(userId: string) {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    })
  }
}
