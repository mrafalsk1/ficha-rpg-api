import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm"
import { Attribute } from "./Attribute"
import { Character } from "./Character"



/**
 * @openapi
 * components:
 *   schemas:
 *     CharacterAttribute:
 *       type: object
 *       properties:
 *         value:
 *           type: integer
 *         bonus:
 *           type: integer
 *         attribute:
 *           $ref: '#/components/schemas/Attribute'
 *         character:
 *           $ref: '#/components/schemas/Character'
 * 
 */
@Entity("characterAttributes")
class CharacterAttribute {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column({ default: 1 })
    value: number

    @Column({ default: 0 })
    bonus: number

    @Column({nullable: false})
    attributeId: number

    @ManyToOne(() => Attribute, (attribute) => attribute.characterAttributes)
    attribute?: Attribute

    @ManyToOne(() => Character, (character) => character.characterAttributes)
    character?: Character


}

export { CharacterAttribute }
