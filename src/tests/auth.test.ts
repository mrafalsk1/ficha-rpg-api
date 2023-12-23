// import 'reflect-metadata'
// import { container, inject, injectable } from "tsyringe";
import app from "../app";
import { User } from "../entities/User";
import supertest from 'supertest'
import { UserService } from "../services/user.service";
import { container } from "tsyringe";
import getConnection from "../database/getConnection";
import destroyConnection from "../database/destroyConnection";


const payloadCreateUser = {
    name: "teste1",
    password: "senha1"
}


describe("auth", () => {
    const userService = container.resolve(UserService)
    let userId = 1
    beforeAll(async () => {
        await getConnection()
        const user = await userService.create(payloadCreateUser)
        userId = user.id
    })

    it("Should be able to login", async () => {

        const { statusCode, body } = await supertest(app)
            .post("/login")
            .send({ username: payloadCreateUser.name, password: payloadCreateUser.password })


        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('token')
        expect(body).toHaveProperty('usuarioId')


    })
    it("Should fail on login wrong username", async () => {
        const { statusCode, body } = await supertest(app)
            .post("/login")
            .send({ username: 'sdadsa', password: payloadCreateUser.password })


        expect(statusCode).toBe(400)
        expect(body).toStrictEqual({ error: "Invalid Password/name" })
    })
    it("Should fail on login wrong password", async () => {
        const { statusCode, body } = await supertest(app)
            .post("/login")
            .send({ username: payloadCreateUser.name, password: 'fdafad' })


        expect(statusCode).toBe(400)
        expect(body).toStrictEqual({ error: "Invalid Password/name" })
    })
    it("Should fail username and password must be string", async () => {
        const payloadFail = {
            username: 123,
            password: 123
        }
        const { statusCode, body }: { statusCode: number, body: { error: string } } = await supertest(app)
            .post("/login")
            .send(payloadFail)

        expect(statusCode).toBe(400)
        const [usernameError, passwordError] = body.error.split(',')
        expect(usernameError).toBe("Username must be string")
        expect(passwordError).toBe("Password must be string")
    })
    it("Should fail username and password must be string", async () => {
        const payloadFail = {
        }
        const { statusCode, body }: { statusCode: number, body: { error: string } } = await supertest(app)
            .post("/login")
            .send(payloadFail)

        expect(statusCode).toBe(400)
        const [usernameError, passwordError] = body.error.split(',')
        expect(usernameError).toBe("Username is required")
        expect(passwordError).toBe("Password is required")
    })

    afterAll(async () => {
        await userService.remove(userId)
        await destroyConnection()
    })
})