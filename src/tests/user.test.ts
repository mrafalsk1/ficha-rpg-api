import 'reflect-metadata'
import { container, inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import supertest from 'supertest'
import { UserService } from "../services/user.service";
import { ICreateUser } from "../entities/schemas/CreateUser";
import app from '../app';
import getConnection from '../database/getConnection';
import destroyConnection from '../database/destroyConnection'

const payloadCreateUser: ICreateUser = {
    name: "testelogin",
    password: "senha1"
}

let userId = 1
describe("user create", () => {
    const userService = container.resolve(UserService)
    beforeAll(async () => {
        await getConnection()

    })
    it("Should be able to create user", async () => {
        const { statusCode, body } = await supertest(app)
            .post("/users")
            .send(payloadCreateUser)


        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('id')
        userId = body.id

    })

    it("Should fail user already exists", async () => {
        const { statusCode, body } = await supertest(app)
            .post("/users")
            .send(payloadCreateUser)

        expect(statusCode).toBe(403)
        expect(body).toStrictEqual({ error: "Already exists an user with this name" })
    })

    it("Should fail name and password must be string", async () => {
        const payloadFail = {
            name: 123,
            password: 123
        }
        const { statusCode, body }: { statusCode: number, body: { error: string } } = await supertest(app)
            .post("/users")
            .send(payloadFail)

        expect(statusCode).toBe(400)
        const [nameError, passwordError] = body.error.split(',')
        expect(nameError).toBe("Name must be string")
        expect(passwordError).toBe("Password must be string")
    })
    it("Should failt name and password required", async () => {
        const payloadFail = {}

        const { statusCode, body }: { statusCode: number, body: { error: string } } = await supertest(app)
            .post("/users")
            .send(payloadFail)

        expect(statusCode).toBe(400)
        const [nameError, passwordError] = body.error.split(',')
        expect(nameError).toBe("Name is required")
        expect(passwordError).toBe("Password is required")
    })


    afterAll(async () => {
        await userService.remove(userId)
        await destroyConnection()
    })

})
