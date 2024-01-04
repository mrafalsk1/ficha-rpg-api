import { NextFunction, Request, Response } from "express"
import { ICreateAttribute } from "../entities/schemas/CreateAttribute";
import { inject, injectable } from "tsyringe";
import { AttributeService } from "../services/atttribute.service";

@injectable()
export class AttributeController {
    constructor(@inject("AttributeService") private attributeService: AttributeService) { }
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body as ICreateAttribute

            const attribute = await this.attributeService.create(body)
            return response.json(attribute)

        } catch (error) {
            next(error)
        }

    }
}
