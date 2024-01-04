/**
 * @openapi
 * components:
 *   responses:
 *     NotFoundError:
 *       description: Not found
 */
export default class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}