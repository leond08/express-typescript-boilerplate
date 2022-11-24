export {}
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValid(message: string): R
    }
  }
}
