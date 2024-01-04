import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
} from "typeorm"
import { Attribute } from "./Attribute"


/**
 * @openapi
 * components:
 *   schemas:
 *     Effect:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *         expression:
 *           type: string
 * 
 */
@Entity("effects")
class Effect {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    description: string

    @Column({ nullable: true })
    expression: string

    @ManyToMany(() => Attribute, attribute => attribute.effects)
    attribute: Attribute

}

export { Effect }
