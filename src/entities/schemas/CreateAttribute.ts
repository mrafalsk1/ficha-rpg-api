import * as z from 'zod'
import { Effect } from '../Effect'

export interface ICreateAttribute {
    name: string
    effects: Effect[]
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAttribute:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         effects:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               expression:
 *                 type: string
 * 
 */

export const CreateAttributeSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string"
        }),
        effects: z.array(z.object({
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be string"
            }),
            expression: z.string({
                invalid_type_error: "Effect must be string",
            }).nullish()
        }))
    })
})