import { Application } from 'express'
import helmet, { HelmetOptions } from 'helmet'

class Helmet {
  public init(express: Application): Application {
    const options: HelmetOptions = {}

    express.use(helmet(options))

    return express
  }
}

export default new Helmet()
