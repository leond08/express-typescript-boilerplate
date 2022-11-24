import { Application } from 'express'
import logger from 'morgan'

class Log {
  public init(express: Application) {
    express.use(logger('dev'))

    return express
  }
}

export default new Log()
