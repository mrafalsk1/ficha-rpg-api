
/**
 * @openapi
 * components:
 *   responses:
 *     ForbiddenError:
 *       description: Forbidden
 */
export default class ForbiddenError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
