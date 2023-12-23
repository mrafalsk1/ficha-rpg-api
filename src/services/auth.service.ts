import { compare } from "bcrypt"
import { User } from "../entities/User"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret/secret"
import UnauthorizedError from "../entities/errors/UnauthorizedError"
import ValidationError from "../entities/errors/ValidationError"
import { Repository } from "typeorm"
import { inject, injectable } from "tsyringe"

@injectable()
export class AuthService {
  constructor(
    @inject('UserRepository') private userRepository: Repository<User>) { }

  async authenticate(name: string, senha: string): Promise<{ token: string, user: User }> {

    const user = await this.userRepository.findOneBy({ name })

    if (!user) {
      throw new ValidationError("Invalid Password/name")
    }

    const passwordMatch = await compare(senha, user.password)

    if (!passwordMatch) {
      throw new ValidationError("Invalid Password/name")
    }

    const token = this.generateToken({ id: user.id, name: user.password })
    return { token, user }
  }

  generateToken(user: { id: number; name: string }): string {
    const payload = {
      id: user.id,
      name: user.name,
    }

    const options: jwt.SignOptions = {
      expiresIn: "1d",
    }

    return jwt.sign(payload, JWT_SECRET, options)
  }

  verifyToken(token: string): object | string {
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      return decoded
    } catch (error) {
      throw new UnauthorizedError()
    }
  }
}
