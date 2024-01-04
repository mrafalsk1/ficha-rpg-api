import * as z from 'zod'

export interface ICreateCharacter {
    name: string,
    userId: number
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCharacter:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 * 
 */

export const CreateCharacterSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string"
        }),
    })
})