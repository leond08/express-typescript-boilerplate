import { Application, NextFunction, Request, Response } from 'express'
import { IError } from '../types/local'
import { BaseError } from '../utils/Error'

class ErrorHandler {
  private errorHandler(
    err: IError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ): void {
    // render the error
    if (err instanceof BaseError) {
      res.status(err.code).send(err.response())
    } else {
      res.status(500).send(new BaseError(err.message).response())
    }
  }

  public init(express: Application) {
    express.use(this.errorHandler)
    return express
  }
}

export default new ErrorHandler()
