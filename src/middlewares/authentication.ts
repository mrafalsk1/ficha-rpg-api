import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret/secret"
import { RequestUser } from "../@types/express"

function verifyToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Token não fornecido" })
  }
  const token = req.headers.authorization.split("Bearer ")[1]
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded as RequestUser
    next()
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" })
  }
}

export { verifyToken }
