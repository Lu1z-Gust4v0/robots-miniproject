export interface Error {
  message: string;
}

export function isError(input: unknown): input is Error {
  if ((input as Error).message !== undefined) {
    return true
  }
  return false
}
