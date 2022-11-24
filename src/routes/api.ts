import { Router, Request, Response, NextFunction } from 'express'
import SampleEvent from '../events/SampleEvent'
import Event from '../providers/Event'
import { userSchema, UserSchemaBody, UserSchemaParams } from '../schema/user'
import { ValidationError } from '../utils/Error'
const router = Router()

/**
 * @openapi
 * /api/healthcheck:
 *  get:
 *   tags:
 *    - Healthcheck
 *   summary: Check if app is up and running
 *   description: Returns 200 status
 *   responses:
 *    200:
 *     description: App is up and running
 *
 */
router.get('/healthcheck', (req: Request, res: Response) => {
  Event.dispatch(new SampleEvent('App is running'))
  return res.sendStatus(200)
})

/**
 * @openapi
 * /api/users:
 *  post:
 *   tags:
 *    - User
 *   summary: Register user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserSchemaBody'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UserSchemaResponse'
 *    422:
 *     description: Unprocessable Entity
 *
 *
 *
 */
router.post(
  '/users',
  (
    req: Request<unknown, unknown, UserSchemaBody>,
    res: Response,
    next: NextFunction
  ) => {
    req
      .validate(userSchema.body, req.body)
      .then(() => {
        return res.status(200).json({
          id: Math.floor(Math.random() * 1000),
          name: req.body.name.toString(),
          email: req.body.email.toString(),
          createdAt: new Date(),
          updateAt: new Date(),
        })
      })
      .catch((error) => {
        next(new ValidationError(error.message))
      })
  }
)

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *   tags:
 *    - User
 *   summary: Get user by id
 *   description: Returns user by id
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UserSchemaResponse'
 *    422:
 *     description: Unprocessable Entity
 *  parameters:
 *   - name: id
 *     in: path
 *     description: Id of the user
 *     required: true
 *     schema:
 *      type: integer
 *
 *
 */
router.get(
  '/users/:id',
  (req: Request<UserSchemaParams>, res: Response, next: NextFunction) => {
    req
      .validate(userSchema.params, req.params)
      .then(() => {
        return res.status(200).json({
          id: req.params.id,
          name: 'John Doe',
          email: 'john.doe@example.com',
          createdAt: new Date(),
          updateAt: new Date(),
        })
      })
      .catch((error) => {
        next(new ValidationError(error.message))
      })
  }
)

export default router
