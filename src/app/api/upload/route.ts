import { NextResponse } from "next/server";
import { Readable } from "stream";
import readline from "readline";
import path from "path";
import fs, { promises } from "fs";
import { format } from "date-fns";
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
    const buffer = Buffer.from(await (file as File).arrayBuffer());

    const stream = Readable.from(buffer);

    const reader = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    const taskId = getTaskId(dataDirectory, id ?? "");
    const now = new Date();
      
    // Count the number of actions. 
    let counter = 0;    
    for await (const line of reader) {
      const parsed = Papa.parse(line).data[0] as string[];

      parsed.forEach(async (item, index) => {
        await promises.appendFile(
          `${dataDirectory}/details.txt`,
          `${taskId},${formatDate(new Date(now.getTime() + 1000 * index))},${item}\n`,
        );
        counter++;
      });
    }
    // start, task_id, status, end 
    await promises.appendFile(
      `${dataDirectory}/executions.txt`,
      `${formatDate(now)},${taskId},pendente,${formatDate(new Date(now.getTime() + 1000 * counter))}\n`,
    );
  });

  return NextResponse.json({ message: "Bot executed successfully" });
}
