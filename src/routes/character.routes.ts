import { Router } from "express"
import { validate } from "../middlewares/validate"
import { inject, injectable } from "tsyringe"
import { CreateCharacterSchema } from "../entities/schemas"
import { CharacterController } from "../controllers/character.controller"
import { verifyToken } from "../middlewares/authentication"

@injectable()
export class CharacterRouter {
  public router: Router


  constructor(@inject("CharacterController") private characterController: CharacterController) {
    this.router = Router()
    this.routes()
  }

  private routes() {
    /**
     * @openapi
     * /characters:
     *   post:
     *     security:
     *       - bearerAuth: []
     *     description: Create new character, retrive the created character.
     *     tags:
     *      - Characters
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCharacter'
     *     responses:
     *       200:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Character'
     *       400:
     *        $ref: '#/components/responses/ValidationError'
     */
    this.router.post("/", validate(CreateCharacterSchema),verifyToken, this.characterController.create.bind(this.characterController))
  }
}
