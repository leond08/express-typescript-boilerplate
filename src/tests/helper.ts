/* eslint-disable @typescript-eslint/no-explicit-any */
export function errorMessage(errors: any): string {
  return (errors || [])
    .map((error: any) => {
      return error.message
    })
    .join('\n')
}
