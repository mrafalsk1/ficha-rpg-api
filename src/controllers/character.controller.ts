import { NextFunction, Request, Response } from "express"
import { ICreateCharacter } from "../entities/schemas/CreateCharacter";
import { inject, injectable } from "tsyringe";
import { CharacterService } from "../services/character.service";

@injectable()
export class CharacterController {
    constructor(@inject("CharacterService") private characterService: CharacterService) { }
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body as ICreateCharacter
            body.userId = request.user.id

            const character = await this.characterService.create(body)
            return response.json(character)

        } catch (error) {
            next(error)
        }

    }
}
