import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm"
import { User } from "./User"
import { CharacterAttribute } from "./CharacterAttribute"



/**
 * @openapi
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         hp:
 *           type: number
 *         xp: 
 *           type: number
 *         pointsBalance:
 *           type: number
 *         gold:
 *           type: number
 *         history:
 *           type: string
 *         characterAttributes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CharacterAttribute'
 *         
 * 
 */
@Entity("characters")
class Character {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    name: string

    @Column({ default: Math.min(Math.floor(Math.random() * 6) + 1, 5) + 3 })
    hp: number

    @Column({ default: 0 })
    xp: number

    @Column({ default: 5 })
    pointsBalance: number

    @Column({ default: 0 })
    gold: number

    @Column({ default: '' })
    history: string

    @Column({nullable: false})
    userId: number

    @ManyToOne(() => User, (user) => user.characters)
    user: User

    @OneToMany(() => CharacterAttribute, characterAttributes => characterAttributes.character, { cascade: ['insert', 'update'] })
    characterAttributes: CharacterAttribute[]

}

export { Character }
