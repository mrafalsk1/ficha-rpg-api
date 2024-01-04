import { Router } from "express"
import { validate } from "../middlewares/validate"
import { inject, injectable } from "tsyringe"
import { AttributeController } from "../controllers/attribute.controller"
import { CreateAttributeSchema } from "../entities/schemas/CreateAttribute"
import { verifyToken } from "../middlewares/authentication"

@injectable()
export class AttributeRouter {
  public router: Router


  constructor(@inject("AttributeController") private attributeController: AttributeController) {
    this.router = Router()
    this.routes()
  }

  private routes() {
    /**
     * @openapi
     * /attributes:
     *   post:
     *     security:
     *       - bearerAuth: []
     *     description: Create new Attribute, retrive the created Attribute.
     *     tags:
     *      - Attributes
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateAttribute'
     *     responses:
     *       200:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Attribute'
     *       400:
     *         $ref: '#/components/responses/ValidationError'
     */
    this.router.post("/", validate(CreateAttributeSchema),verifyToken, this.attributeController.create.bind(this.attributeController))
  }
}
