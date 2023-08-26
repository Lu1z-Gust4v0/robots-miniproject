import { NextResponse } from "next/server";
import { Readable } from "stream";
import readline from "readline";
import path from "path";
import fs, { promises } from "fs";
import { addSeconds, format } from "date-fns";
import Papa from "papaparse";

function getTaskId(path: string, id: string): string {
  const taskCount =
    fs.readFileSync(`${path}/task_count.txt`, "utf8").split(/\r?\n/)[0];

  // update counter
  fs.writeFileSync(`${path}/task_count.txt`, `${parseInt(taskCount) + 1}`);

  return `${id}-task-${parseInt(taskCount) + 1}`;
}

function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const dataDirectory = path.join(`${process.cwd()}/public/data`);

  const formData = await request.formData();

  formData.getAll("file").forEach(async (file) => {
    const taskId = getTaskId(dataDirectory, id ?? "");
    
    const now = new Date();

    const buffer = Buffer.from(await (file as File).arrayBuffer());

    const stream = Readable.from(buffer);

    const reader = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    for await (const line of reader) {
      const parsed = Papa.parse(line).data[0] as string[];
      
      for (let index = 0; index < parsed.length; index++) {
        await promises.appendFile(
          `${dataDirectory}/details.txt`,
          `${taskId},${formatDate(addSeconds(now, index))},${parsed[index]}\n`,
        );

        if (index == parsed.length - 1) {
          await promises.appendFile(
            `${dataDirectory}/executions.txt`,
            `${formatDate(now)},${taskId},pendente,${
              formatDate(addSeconds(now, index))
            }\n`,
          );
        }
      }
    }

    stream.destroy();
  });

  return NextResponse.json({ message: "Bot executed successfully" });
}
