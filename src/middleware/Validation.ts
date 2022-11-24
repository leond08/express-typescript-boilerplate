import { Response, NextFunction, Request } from 'express'
import { AnyObjectSchema } from 'yup'

class Validation {
  public init(req: Request, res: Response, next: NextFunction) {
    // add request validation method to the express request object
    req['validate'] = async (rules: AnyObjectSchema, data: object) => {
      return await rules.validate(data)
    }
    return next()
  }
}

export default new Validation()
