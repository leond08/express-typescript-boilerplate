import httpStatus from 'http-status'

/**
 * Super class BaseError
 *
 * @extends {Error}
 */
export class BaseError extends Error {
  public code: number
  public stackStrace: string | undefined
  constructor(err: string, name?: string, code?: number) {
    super(err)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this)
    }

    this.name = name || 'BaseError'
    this.code = code || httpStatus.INTERNAL_SERVER_ERROR
    this.message = err || 'Server error'
    this.stackStrace = this.stack
  }

  response() {
    return {
      error: {
        code: this.code,
        message: this.message,
      },
    }
  }
}

export class NotFoundError extends BaseError {
  constructor(err: string) {
    super(err)
    this.name = 'NotFoundError'
    this.message = err || 'Not found'
    this.code = httpStatus.NOT_FOUND
  }
}

export class ValidationError extends BaseError {
  constructor(err: string) {
    super(err)
    this.name = 'ValidationError'
    this.message = err || 'Unprocessable entity'
    this.code = httpStatus.UNPROCESSABLE_ENTITY
  }
}

export class PermissionError extends BaseError {
  constructor(err: string) {
    super(err)
    this.name = 'PermissionError'
    this.message = err || 'Unauthorized'
    this.code = httpStatus.UNAUTHORIZED
  }
}

export class ForbiddenError extends BaseError {
  constructor(err: string) {
    super(err)
    this.name = 'ForbiddenError'
    this.message = err || 'Forbidden'
    this.code = httpStatus.FORBIDDEN
  }
}
