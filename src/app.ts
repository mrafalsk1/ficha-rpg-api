import "reflect-metadata"
import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import {
  UserRouter,
  AuthRouter,
} from "./routes"
import { datasource, datasourceTest } from "./database/ormconfig"
import NotFoundError from "./entities/errors/NotFoundError"
import ValidationError from "./entities/errors/ValidationError"
import UnauthorizedError from "./entities/errors/UnauthorizedError"
import ForbiddenError from "./entities/errors/ForbiddenError"

import swaggerUi from "swagger-ui-express"
import { NODE_ENV, SERVER_PORT } from "./secret/secret"
import "./container/index"
import { swaggerSpec } from "./documentation"
import { container } from "tsyringe"

class App {
  public express: Application = express()
  constructor() {
    this.config()
    this.routes()
    this._404()
    this.errorHandling()


    if (NODE_ENV !== 'test') {
      datasourceTest
        .initialize()
        .then(() => {
          console.log("Data Source has been initialized!")
        })
        .catch((err) => {
          console.error("Error during Data Source initialization", err)
        })
    }



    // this.express.listen(this.express.get('port'), () => {
    //   console.log(`Server is running on port ${this.express.get('port')}`)
    // })
  }

  private config() {
    this.express.set("port", SERVER_PORT)
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes() {
    this.express.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    this.express.use("/", container.resolve(AuthRouter).router)
    this.express.use("/users", container.resolve(UserRouter).router)
  }

  private errorHandling() {
    this.express.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (error instanceof ValidationError) {
          return response.status(400).json({
            error: error.message,
          })
        }
        if (error instanceof UnauthorizedError) {
          return response.status(401).json({
            error: error.message,
          })
        }

        if (error instanceof ForbiddenError) {
          return response.status(403).json({
            error: error.message,
          })
        }
        if (error instanceof NotFoundError) {
          return response.status(404).json({
            error: error.message,
          })
        }
        return response.status(500).json({
          status: "error",
          message: "Internal Server Error",
          error: error
        })
      }
    )
  }

  private _404(): void {
    this.express.use((req: Request, res: Response) => {
      res.sendStatus(404)
    })
  }
}


const app = new App()
export default app.express