import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import readline from "readline";
import { removeWhitespace } from "@/utils/string";

export async function GET() {
  const dataDirectory = path.join(`${process.cwd()}/public/data`);

  const fileStream = fs.createReadStream(
    `${dataDirectory}/credentials.txt`,
    "utf8",
  );

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of reader) {
    const [username, email, _, loggedIn] = line.split(",");

    if (removeWhitespace(loggedIn) === "true") {
      fileStream.close();

      return NextResponse.json({ message: "Logged in", content: [username, email] });
    }
  }

  fileStream.close();

  return NextResponse.json({ message: "Not logged in" }, { status: 400 });
}
