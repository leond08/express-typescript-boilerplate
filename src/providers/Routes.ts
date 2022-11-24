import { Application } from 'express'
import apiRouter from '../routes/api'

class Routes {
  public mountApi(express: Application): Application {
    express.use('/api', apiRouter)
    return express
  }
}

export default new Routes