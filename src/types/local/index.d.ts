/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IEvent {
  event: any
  listeners: any[]
}

export type IErrorResponse = {
  error: {
    code: number
    message: string
  }
}

export interface IError extends Error {
  code: number
  stackStrace: string | undefined
  response(): IErrorResponse
}
