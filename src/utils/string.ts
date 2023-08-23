export function isString(input: unknown): input is string {
  if (typeof input === "string") {
    return true;
  }
  return false;
}

export function removeWhitespace(input: string): string {
  return input.replace(/\s/g, "")
}
