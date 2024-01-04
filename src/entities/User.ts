import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm"
import { genSalt, hash } from "bcrypt"
import NotFoundError from "./errors/NotFoundError"
import getRepository from "../database/getRepository"
import { Character } from "./Character"

interface IUsuarioWithoutPass extends Exclude<User, "password"> { }


/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         adm:
 *           type: boolean
 * 
 */
@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ unique: true })
  name: string

  @Column()
  password: string

  @Column({ default: false })
  adm: boolean

  @OneToMany(() => Character, (character) => character.user)
  characters: Character[]

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10
    const salt = await genSalt(saltRounds)
    this.password = await hash(this.password, salt)
  }

  static async findOneWithoutPassword(
    id: number
  ): Promise<IUsuarioWithoutPass> {
    const user = await getRepository<User>(User).findOneBy({ id })

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!")
    }
    const userWithoutPass = { ...user } as IUsuarioWithoutPass
    return userWithoutPass
  }
}

export { User }
