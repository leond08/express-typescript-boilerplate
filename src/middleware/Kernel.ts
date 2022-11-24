import { Application } from 'express'
import Cors from './Cors'
import Helmet from './Helmet'
import Http from './Http'
import Log from './Log'
import Validation from './Validation'

class Kernel {
  public init(express: Application): Application {
    express = Log.init(express)
    express = Http.init(express)
    express = Cors.init(express)
    express = Helmet.init(express)
    express.use(Validation.init)

    return express
  }
}

export default new Kernel()
