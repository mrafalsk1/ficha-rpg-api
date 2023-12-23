import { NextFunction, Request, Response } from "express"
import { ICreateUser } from "../entities/schemas/CreateUser";
import { inject, injectable } from "tsyringe";
import { UserService } from "../services/user.service";

@injectable()
export class UserController {
  constructor(@inject("UserService") private userService: UserService) { }
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body as ICreateUser

      const user = await this.userService.create(body)
      return response.json(user)

    } catch (error) {
      console.log(error);

      next(error)
    }

  }
}
