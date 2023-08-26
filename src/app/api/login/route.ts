import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import readline from "readline";
import { removeWhitespace } from "@/utils/string";

interface ILoginForm {
  user: string;
  password: string;
}

function updateCredentials(path: string, credentials: string) {
  fs.writeFileSync(`${path}/credentials.txt`, `${credentials},true`)
}

export async function POST(request: Request) {
  const { user, password } = await request.json() as ILoginForm;

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
    const [lineUser, lineEmail, linePassword, _] = line.split(",");

    if (
      lineUser === removeWhitespace(user) &&
      linePassword === removeWhitespace(password)
    ) {
      fileStream.close();

      updateCredentials(dataDirectory,`${lineUser},${lineEmail},${linePassword}`) 

      return NextResponse.json({
        message: "Credentials confirmed successfully",
      }, { status: 200 });
    }
  }

  fileStream.close();

  return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
}
