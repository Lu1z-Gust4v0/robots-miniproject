import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import readline from "readline";
import { removeWhitespace } from "@/utils/string";

interface IRecoverForm {
  email: string;
}

export async function POST(request: Request) {
  const { email } = await request.json() as IRecoverForm;

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
    const [_, lineEmail, linePassword, __] = line.split(",");

    if (lineEmail === removeWhitespace(email)) {
      fileStream.close();

      return NextResponse.json({
        message: `Your password is ${removeWhitespace(linePassword)}`,
      }, { status: 200 });
    }
  }

  fileStream.close();

  return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
}
