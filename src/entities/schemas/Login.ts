import * as z from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

export interface ILogin {
    username: string
    password: string
}

export const LoginSchema =  z.object({
    body: z.object({
        username: z.string({
            required_error: "Username is required",
            invalid_type_error: "Username must be string"
        }),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error:"Password must be string"
            
        }),
    })
})
