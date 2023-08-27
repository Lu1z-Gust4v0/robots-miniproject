import path from "path";
import fs, { promises } from "fs";
import readline from "readline";
import { NextResponse } from "next/server";
import { removeWhitespace } from "@/utils/string";
import { parseStatus } from "@/utils/status";
import { executions } from "@/data/defaults";
import { createAndAppend } from "@/utils/write";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const dataDirectory = path.join(`${process.cwd()}/public/data`);

  if (!fs.existsSync(dataDirectory)) {
    await promises.mkdir(dataDirectory, { recursive: true });
  }

  const target = `${dataDirectory}/executions.txt`;

  if (!fs.existsSync(target)) {
    await createAndAppend(target, executions);
  }

  const fileStream = fs.createReadStream(target, "utf8");

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const response: string[] = [];
  for await (const line of reader) {
    const executionId = line.split(",")[1];

    if (executionId && id === removeWhitespace(executionId.split("-")[0])) {
      const [start, taskId, status, end] = line.split(",");

      response.push(`${start},${taskId},${parseStatus(status, end)}`);
    }
  }

  fileStream.close();

  return NextResponse.json({ content: response });
}
