import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";
import { Character } from "../entities/Character";
import { ICreateCharacter } from "../entities/schemas";
import { Attribute } from "../entities/Attribute";
import { CharacterAttribute } from "../entities/CharacterAttribute";
import { ICreateCharacterAttribute } from "../entities/schemas/CreateCharacterAttribute";

@injectable()
export class CharacterService {
    constructor(
        @inject("CharacterRepository") private characterRepository: Repository<Character>,
        @inject("AttributeRepository") private attributeRepository: Repository<Attribute>,
        @inject("CharacterAttributeRepository") private characterAttributeRepository: Repository<CharacterAttribute>
    ) { }

    public async create(payload: ICreateCharacter): Promise<Character> {
        const createCharacter = { ...payload, characterAttributes: await this.createDefaultAttributes(),  }

        let character = this.characterRepository.create(createCharacter)
        character = await this.characterRepository.save(character)
        return character

    }

    public async createDefaultAttributes(): Promise<CharacterAttribute[]> {
        // TODO quando tiver vários sistemas tem que filtrar aqui
        const attributes = await this.attributeRepository.find()
        const characterAttributes: CharacterAttribute[] = []

        for (const attribute of attributes) {
            const characterAttribute: ICreateCharacterAttribute = { bonus: 0, value: 1, attributeId: attribute.id }
            characterAttributes.push(this.characterAttributeRepository.create(characterAttribute))
        }

        return characterAttributes

    }
}