/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObjectSchema } from 'yup'

// to make the file a module and avoid the TypeScript error
export {}

declare global {
  namespace Express {
    export interface Request {
      validate(rules: AnyObjectSchema, data: object): Promise<any>
    }
  }
}
