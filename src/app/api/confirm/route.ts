import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import readline from "readline";
import { removeWhitespace } from "@/utils/string";

interface IConfirmDataForm {
  user: string;
  password: string;
  year: number;
  company: string;
}

export async function POST(request: Request) {
  const { user, password } = await request.json() as IConfirmDataForm;

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
    const [lineUser, _, linePassword] = line.split(",");

    if (
      lineUser === removeWhitespace(user) &&
      linePassword === removeWhitespace(password)
    ) {
      return NextResponse.json({
        message: "Credentials confirmed successfully",
      }, { status: 200 });
    }
  }

  fileStream.close();

  return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
}
