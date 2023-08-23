import path from "path";
import { promises } from "fs";
import { NextResponse } from "next/server";
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const dataDirectory = path.join(`${process.cwd()}/public/data`)

  const content = await promises.readFile(`${dataDirectory}/executions.txt`, "utf8")

  const lines = content.split(/\r?\n/);

  const response: string[] = []

  lines.forEach((line) => {
    if (id === line.split("-")[0]) {
      response.push(line)
    } 
  });

  return NextResponse.json({ content: response })
}
