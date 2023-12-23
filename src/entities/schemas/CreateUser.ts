import * as z from 'zod'

export interface ICreateUser {
    name: string
    password: string
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         password:
 *           type: string
 * 
 */

export const CreateUserSchema =  z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string"
        }),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error:"Password must be string"
                                                                        
        }),
    })
})