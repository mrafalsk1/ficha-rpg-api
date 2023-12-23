import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { LoginSchema } from "../entities/schemas/Login";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthRouter {

    public router: Router;

    constructor(
        @inject("AuthController") private authController: AuthController
    ) {
        this.router = Router();
        this.routes()
    }

    private routes() {
        /**
         * @openapi
         * /login:
         *   post:
         *     description: Retrieve the id of the logged user and the access token.
         *     tags:
         *      - Auth
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Login'
         *     responses:
         *       200:
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 id:
         *                   type: integer
         *                   description: Logged user ID
         *                 accessToken:
         *                   type: string
         *       400:
         *        description: Invalid username/password
         */
        this.router.post('/login', validate(LoginSchema), this.authController.login.bind(this.authController))
    }
}