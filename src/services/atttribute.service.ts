import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";
import { Attribute } from "../entities/Attribute";
import { ICreateAttribute } from "../entities/schemas";
import { evaluateExpression, replaceAll } from "../utils/stringUtils";
import ValidationError from "../entities/errors/ValidationError";

@injectable()
export class AttributeService {
    constructor(@inject("AttributeRepository") private AttributeRepository: Repository<Attribute>) { }

    public async create(payload: ICreateAttribute): Promise<Attribute> {
        this.validateEffect(payload)
        
        let attribute = this.AttributeRepository.create(payload)
        attribute = await this.AttributeRepository.save(attribute)

        return attribute

    }

    public validateEffect(payload: ICreateAttribute) {
        const allowedKeys = ['description', 'expression']

        payload.effects.forEach(effect => {
            if (effect.expression) {
                if (!this.isValidExpression(effect.expression)) {
                    throw new ValidationError("One expression of the effects are invalid")
                }
            }

            if (!Object.keys(effect).every(key => allowedKeys.includes(key))) {
                throw new ValidationError("Invalid parameter on effects")
            }
        })
    }

    private isValidExpression(expression: string) {
        try {
            const result = evaluateExpression(replaceAll(replaceAll(expression, 'x', Math.random().toFixed()), 'y', Math.random().toFixed()))

            return typeof result === 'number' && !isNaN(result);
        } catch (error) {
            return false
        }
    }

}