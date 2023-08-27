import { promises } from "fs";

export async function createAndAppend(target: string, data: string[]) {
  await promises.writeFile(target, "", "utf8");

  data.forEach(async (line) => {
    await promises.appendFile(target, line + "\n");
  });
}
