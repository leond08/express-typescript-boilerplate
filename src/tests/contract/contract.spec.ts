import nock from 'nock'
import Ajv from 'ajv'
import axios from 'axios'
import { errorMessage } from '../helper'
const ajv = new Ajv()
const contract = {
  openapi: '3.0.0',
  info: { title: 'API Documentation', version: '1.0.0' },
  servers: [{ url: 'http://localhost:3001' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      UserSchemaBody: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', default: 'John Doe' },
          email: { type: 'string', default: 'john.doe@example.com' },
        },
      },
      UserSchemaResponse: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          createdAt: { type: 'string' },
          updateAt: { type: 'string' },
          id: { type: 'integer' },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/healthcheck': {
      get: {
        tags: ['Healthcheck'],
        summary: 'Check if app is up and running',
        description: 'Returns 200 status',
        responses: { '200': { description: 'App is up and running' } },
      },
    },
    '/api/users': {
      post: {
        tags: ['User'],
        summary: 'Register user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserSchemaBody' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserSchemaResponse' },
              },
            },
          },
          '422': { description: 'Unprocessable Entity' },
        },
      },
    },
    '/api/users/{id}': {
      get: {
        tags: ['User'],
        summary: 'Get user by id',
        description: 'Returns user by id',
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserSchemaResponse' },
              },
            },
          },
          '422': { description: 'Unprocessable Entity' },
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Id of the user',
          required: true,
          schema: { type: 'integer' },
        },
      ],
    },
  },
  tags: [],
}

const postData = { name: 'John Doe', email: 'john.doe@example.com' }
const responseData = {
  createdAt: new Date(),
  updatedAt: new Date(),
  id: Math.floor(Math.random() * 1000),
  ...postData,
}

describe('Contract Testing', () => {
  beforeAll(() => {
    // mock service
    nock('http://localhost:3002')
      .post('/api/users', postData)
      .reply(200, responseData)
      .get('/api/users/1')
      .reply(200, responseData)
  })

  describe('Register User', () => {
    test('it should register user', (done) => {
      axios
        .post('http://localhost:3002/api/users', postData)
        .then((response) => {
          const valid = ajv.validate(
            contract.components.schemas.UserSchemaResponse,
            response.data
          )

          expect(valid).toBeTruthy
          done()
        })
        .catch((error) => {
          done(error)
        })
    })

    test('it should get user by id', (done) => {
      axios
        .get('http://localhost:3002/api/users/1')
        .then((response) => {
          const valid = ajv.validate(
            contract.components.schemas.UserSchemaResponse,
            response.data
          )
          expect(valid).toBeTruthy
          done()
        })
        .catch((error) => {
          done(error)
        })
    })
  })
})
