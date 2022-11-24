import { InferType, number, object, string } from 'yup'

/**
 * @openapi
 * components:
 *  schemas:
 *   UserSchemaBody:
 *    type: object
 *    required:
 *     - name
 *     - email
 *    properties:
 *     name:
 *      type: string
 *      default: John Doe
 *     email:
 *      type: string
 *      default: john.doe@example.com
 *   UserSchemaResponse:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     email:
 *      type: string
 *     createdAt:
 *      type: string
 *     updateAt:
 *      type: string
 *     id:
 *      type: integer
 *
 */
export const userSchema = {
  body: object({
    name: string()
      .required('name is a required field')
      .max(255, 'max of 255 characters only'),
    email: string()
      .email('invalid email')
      .required('email is a required field'),
  }),
  params: object({
    id: number()
      .typeError('id must be a number')
      .required('id is a required field'),
  }),
}

export type UserSchemaBody = InferType<typeof userSchema['body']>
export type UserSchemaParams = InferType<typeof userSchema['params']>
