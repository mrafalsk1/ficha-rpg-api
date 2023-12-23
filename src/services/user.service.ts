import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { ICreateUser } from "../entities/schemas/CreateUser";
import ForbiddenError from "../entities/errors/ForbiddenError";

@injectable()
export class UserService {
    constructor(@inject("UserRepository") private userRepository: Repository<User>) { }

    public async create(payload: ICreateUser): Promise<User> {

        if (await this.userRepository.findOneBy({ name: payload.name })) {
            throw new ForbiddenError("Already exists an user with this name")
        }

        let user = this.userRepository.create(payload)
        user = await this.userRepository.save(user)

        return user

    }

    public async remove(id: number): Promise<void> {
        await this.userRepository.delete({ id })
    }
}