import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm"
import { CharacterAttribute } from "./CharacterAttribute"
import { Effect } from "./Effect"

/**
 * @openapi
 * components:
 *   schemas:
 *     Attribute:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         effects:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Effect'
 * 
 */
@Entity("attributes")
class Attribute {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    name: string

    @OneToMany(() => CharacterAttribute, characterAttributes => characterAttributes.attribute)
    characterAttributes: CharacterAttribute[]

    @OneToMany(() => Effect, effect => effect.attribute, { cascade: ['insert', 'remove'] })
    effects: Effect[]

}

export { Attribute }
