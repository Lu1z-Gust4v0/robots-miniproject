import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import readline from "readline";
import { removeWhitespace } from "@/utils/string";

interface IChangePasswordForm {
  user: string;
  email: string;
  password: string;
  newpassword: string;
}

function updateCredentials(path: string, credentials: string) {
  fs.writeFileSync(`${path}/credentials.txt`, `${credentials},false`)
}

export async function POST(request: Request) {
  const { user, email, password, newpassword } = await request.json() as IChangePasswordForm;

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
      lineEmail === removeWhitespace(email) &&
      linePassword === removeWhitespace(password)
    ) {
      fileStream.close();

      updateCredentials(dataDirectory,`${lineUser},${lineEmail},${newpassword}`) 

      return NextResponse.json({
        message: "Password changed successfully",
      }, { status: 200 });
    }
  }

  fileStream.close();

  return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
}
