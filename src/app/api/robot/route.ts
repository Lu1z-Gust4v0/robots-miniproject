import path from "path";
import fs from "fs";
import readline from "readline";
import { NextResponse } from "next/server";
import { removeWhitespace } from "@/utils/string"

function parseStatus(status: string, due: string): string {
  const now = new Date();
  const dueDate = new Date(due);
  const parsed = removeWhitespace(status);
  
  if (parsed === "pendente" && now > dueDate) {
    return "sucesso";
  }

  return parsed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const dataDirectory = path.join(`${process.cwd()}/public/data`)

  const fileStream = fs.createReadStream(`${dataDirectory}/executions.txt`, "utf8")

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const response: string[] = []
  for await (const line of reader) {
    const executionId = line.split(",")[1]

    if (executionId && id === removeWhitespace(executionId.split("-")[0])) {
      const [start, taskId, status, end] = line.split(",") 
      
      response.push(`${start},${taskId},${parseStatus(status, end)}`)
    }
  }

  return NextResponse.json({ content: response })
}
