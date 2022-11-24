import express, { Application, Request, Response, NextFunction } from 'express'
import ErrorHandler from '../middleware/ErrorHandler'
import Kernel from '../middleware/Kernel'
import { NotFoundError } from '../utils/Error'
import Config from './Config'
import Routes from './Routes'
import Swagger from './Swagger'

class Express {
  public express: express.Application = express()

  private registerRoutes(): void {
    this.express = Routes.mountApi(this.express)
  }

  private registerMiddlewares(): void {
    this.express = Kernel.init(this.express)
  }

  private registerSwagger() {
    this.express = Swagger.bootstrap(this.express)
  }

  private registerErrorHandler() {
    this.express = ErrorHandler.init(this.express)
  }

  private handleRouteNotFound() {
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundError('Route not found'))
    })
  }

  public init(): Application {
    const port = Config.config().port
    this.registerMiddlewares()
    this.registerRoutes()
    this.registerSwagger()
    this.handleRouteNotFound()
    this.registerErrorHandler()
    this.express.set('port', port)
    return this.express
  }
}

export default new Express()
