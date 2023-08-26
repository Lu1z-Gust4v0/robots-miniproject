import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import readline from "readline";

function updateCredentials(path: string, credentials: string) {
  fs.writeFileSync(`${path}/credentials.txt`, `${credentials},false`)
}

export async function POST() {
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
    const [username, email, password, _] = line.split(",");
  
    updateCredentials(dataDirectory, `${username},${email},${password}`)
  }

  fileStream.close();

  return NextResponse.json({ message: "Logged out successfully" });
}
