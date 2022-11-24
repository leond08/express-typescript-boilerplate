import { Application } from 'express'
import cors from 'cors'
import Config from '../providers/Config'

class Cors {
  public init(express: Application): Application {
    const options: cors.CorsOptions = {
      origin: Config.config().url,
    }

    express.use(cors(options))

    return express
  }
}

export default new Cors()
