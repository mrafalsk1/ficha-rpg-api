/**
 * @openapi
 * components:
 *   responses:
 *     ValidationError:
 *       description: Validation Error
 */
export default class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}