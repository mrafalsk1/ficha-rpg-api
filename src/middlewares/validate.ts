import { AnyZodObject, ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express"

export const validate =
    (schema: AnyZodObject) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                return next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const message = error.errors.map(value => value.message)
                    return res.status(400).json({ error: message.join(',') })
                }
                return res.status(400).json(error);
            }
        };

