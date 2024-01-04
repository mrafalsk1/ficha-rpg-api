import { container } from 'tsyringe'
import { Repository } from 'typeorm'
import { User } from '../entities/User'
import getRepository from '../database/getRepository'
import { UserController } from '../controllers/user.controller'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'
import { Character } from '../entities/Character'
import { CharacterController } from '../controllers/character.controller'
import { CharacterService } from '../services/character.service'
import { Attribute } from '../entities/Attribute'
import { AttributeController } from '../controllers/attribute.controller'
import { AttributeService } from '../services/atttribute.service'
import { CharacterAttribute } from '../entities/CharacterAttribute'

container.registerInstance<Repository<User>>(
    "UserRepository",
    getRepository(User)
)

container.registerSingleton<AuthController>(
    "AuthController",
    AuthController
)

container.registerSingleton<AuthService>(
    "AuthService",
    AuthService
)

container.registerSingleton<UserController>(
    "UserController",
    UserController
)
container.registerSingleton<UserService>(
    "UserService",
    UserService
)


container.registerInstance<Repository<Character>>(
    "CharacterRepository",
    getRepository(Character)
)

container.registerSingleton<CharacterController>(
    "CharacterController",
    CharacterController
)
container.registerSingleton<CharacterService>(
    "CharacterService",
    CharacterService
)

container.registerInstance<Repository<Attribute>>(
    "AttributeRepository",
    getRepository(Attribute)
)

container.registerSingleton<AttributeController>(
    "AttributeController",
    AttributeController
)
container.registerSingleton<AttributeService>(
    "AttributeService",
    AttributeService
)

container.registerInstance<Repository<CharacterAttribute>>(
    "CharacterAttributeRepository",
    getRepository(CharacterAttribute)
)