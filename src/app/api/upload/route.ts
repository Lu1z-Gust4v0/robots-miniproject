import { NextResponse } from "next/server";
import { Readable } from "stream";
import readline from "readline";
import path from "path";
import fs, { promises } from "fs";
import { addSeconds, format } from "date-fns";
import { details, executions, taskCount } from "@/data/defaults";
import { createAndAppend } from "@/utils/write";
import Papa from "papaparse";

function getTaskId(path: string, id: string): string {
  const target = `${path}/task_count.txt`;

  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, taskCount);
  }

  const taskId = fs.readFileSync(target, "utf8").split(/\r?\n/)[0];

  // update counter
  fs.writeFileSync(target, `${parseInt(taskId) + 1}`);

  return `${id}-task-${parseInt(taskId) + 1}`;
}

function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const dataDirectory = path.join(`${process.cwd()}/public/data`);

  if (!fs.existsSync(dataDirectory)) {
    await promises.mkdir(dataDirectory, { recursive: true });
  }

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
        const detailsFile = `${dataDirectory}/details.txt`;
        const executionsFile = `${dataDirectory}/executions.txt`;

        if (!fs.existsSync(detailsFile)) {
          await createAndAppend(detailsFile, details);
        }

        if (!fs.existsSync(executionsFile)) {
          await createAndAppend(executionsFile, executions);
        }

        fs.appendFileSync(
          detailsFile,
          `${taskId},${formatDate(addSeconds(now, index))},${parsed[index]}\n`,
        );

        if (index == parsed.length - 1) {
          fs.appendFileSync(
            executionsFile,
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
