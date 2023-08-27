import { NextResponse } from "next/server";
import path from "path";
import fs, { promises } from "fs";
import readline from "readline";
import { removeWhitespace } from "@/utils/string";
import { credentials } from "@/data/defaults";

interface IChangePasswordForm {
  password: string;
  newpassword: string;
}

async function updateCredentials(path: string, credentials: string) {
  await promises.writeFile(`${path}/credentials.txt`, `${credentials},false`);
}

export async function POST(request: Request) {
  const { password, newpassword } = await request.json() as IChangePasswordForm;

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
    const [lineUser, lineEmail, linePassword, _] = line.split(",");

    if (
      linePassword === removeWhitespace(password)
    ) {
      fileStream.close();

      await updateCredentials(
        dataDirectory,
        `${lineUser},${lineEmail},${newpassword}`,
      );

      return NextResponse.json({
        message: "Password changed successfully",
      }, { status: 200 });
    }
  }

  fileStream.close();

  return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
}
