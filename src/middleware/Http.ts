import express, { Application } from 'express'

class Http {
  public init(_express: Application): Application {
    _express.use(express.json())
    _express.use(express.urlencoded({ extended: true }))
    _express.disable('x-powered-by')

    return _express
  }
}

export default new Http()
