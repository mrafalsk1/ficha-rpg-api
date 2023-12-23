import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { validate } from "../middlewares/validate"
import { CreateUserSchema } from "../entities/schemas/CreateUser"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserRouter {
  public router: Router


  constructor(@inject("UserController") private userController: UserController) {
    this.router = Router()
    this.routes()
  }

  private routes() {
    /**
 * @openapi
 * /users:
 *   post:
 *     description: Create new user, retrive the created user.
 *     tags:
 *      - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *        description: Invalid username/password
 *       403:
 *        description: Name already exists
 */
    this.router.post("/", validate(CreateUserSchema), this.userController.create.bind(this.userController))
  }
}
