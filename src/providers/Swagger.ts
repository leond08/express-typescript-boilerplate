import { Application, Request, Response } from 'express'
import swaggerjs from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import Config from './Config'

class Swagger {
  private defineOptions(): swaggerjs.Options {
    const options: swaggerjs.Options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
        },
        servers: [
          {
            url: Config.config().url,
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      apis: ['./src/routes/*.ts', './src/schema/*.ts'],
    }

    return options
  }

  public bootstrap(express: Application) {
    const swaggerSpec = swaggerjs(this.defineOptions())
    express.use(
      '/docs',
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(swaggerSpec)
    )
    express.get('/docs.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
    return express
  }
}

export default new Swagger()
