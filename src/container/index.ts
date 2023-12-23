import { container } from 'tsyringe'
import { Repository } from 'typeorm'
import { User } from '../entities/User'
import getRepository from '../database/getRepository'
import { UserController } from '../controllers/user.controller'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'

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