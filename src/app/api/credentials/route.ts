import { NextResponse } from "next/server";
import path from "path";
import fs, { promises } from "fs";
import readline from "readline";
import { removeWhitespace } from "@/utils/string";
import { credentials } from "@/data/defaults";

export async function GET() {
  const dataDirectory = path.join(`${process.cwd()}/public/data`);
  
  if (!fs.existsSync(dataDirectory)) {
    await promises.mkdir(dataDirectory, { recursive: true })
  }
  
  const target = `${dataDirectory}/credentials.txt`;

  if (!fs.existsSync(target)) {
    await promises.writeFile(target, credentials);
  }

  const fileStream = fs.createReadStream(target, "utf8");

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of reader) {
    const [username, email, _, loggedIn] = line.split(",");

    if (removeWhitespace(loggedIn) === "true") {
      fileStream.close();

      return NextResponse.json({ content: [username, email] });
    }
  }

  fileStream.close();

  return NextResponse.json({ message: "Not logged in" }, { status: 400 });
}
