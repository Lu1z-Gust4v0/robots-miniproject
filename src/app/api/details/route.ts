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
    `${dataDirectory}/details.txt`,
    "utf8",
  );

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const response: string[] = [];
  for await (const line of reader) {
    const detailId = line.split(",")[0];

    if (detailId && id === removeWhitespace(detailId)) {
      response.push(line);
    }
  }

  fileStream.close();

  return NextResponse.json({ content: response });
}
