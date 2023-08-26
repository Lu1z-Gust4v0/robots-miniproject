import { removeWhitespace } from "./string";

export function parseStatus(status: string, due: string): string {
  const now = new Date();
  const dueDate = new Date(due);
  const parsed = removeWhitespace(status);
  
  if (parsed === "pendente" && now > dueDate) {
    return "sucesso";
  }

  return parsed;
}
