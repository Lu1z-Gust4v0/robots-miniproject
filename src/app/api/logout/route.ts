import { NextResponse } from "next/server";
import path from "path";
import fs, { promises } from "fs";
import readline from "readline";
import { credentials } from "@/data/defaults";

async function updateCredentials(path: string, credentials: string) {
  await promises.writeFile(`${path}/credentials.txt`, `${credentials},false`)
}

export async function POST() {
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
    const [username, email, password, _] = line.split(",");
  
    await updateCredentials(dataDirectory, `${username},${email},${password}`)
  }

  fileStream.close();

  return NextResponse.json({ message: "Logged out successfully" });
}
