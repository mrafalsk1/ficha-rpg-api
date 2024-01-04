/**
 * @openapi
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Not authorized
 */
export default class UnauthorizedError extends Error {
    constructor() {
        super("Não autorizado")
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}