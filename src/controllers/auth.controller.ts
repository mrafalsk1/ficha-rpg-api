import { NextFunction, Response, Request } from "express"
import { AuthService } from "../services/auth.service"
import { ILogin } from "../entities/schemas"
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthController {
  constructor(@inject("AuthService") private authService: AuthService) { }

  public async login(request: Request, response: Response, next: NextFunction) {
    try {
      const body: ILogin = request.body

      const res = await this.authService.authenticate(body.username, body.password)

      return response.json({
        token: res.token,
        usuarioId: res.user.id,
      })

    } catch (error) {
      next(error)
    }
  }


}
