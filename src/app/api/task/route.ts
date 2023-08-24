import path from "path";
import fs from "fs";
import readline from "readline";
import { NextResponse } from "next/server";
import { removeWhitespace } from "@/utils/string";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const dataDirectory = path.join(`${process.cwd()}/public/data`);

  const fileStream = fs.createReadStream(
    `${dataDirectory}/executions.txt`,
    "utf8",
  );

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of reader) {
    const executionId = line.split(",")[1];

    if (executionId && id === removeWhitespace(executionId)) {
      return NextResponse.json({ content: line.split(",") }) 
    }
  }

  return NextResponse.json({ content: [], error: "task not found" }, { status: 404 });
}
