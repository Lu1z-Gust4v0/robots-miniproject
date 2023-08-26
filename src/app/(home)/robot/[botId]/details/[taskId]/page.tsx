import { Table, TableBody, TableHeader } from "@/components/Table";
import type { Metadata } from "next";
import { Error, isError } from "@/utils/error";
import LinkButton from "@/components/LinkButton";
import TaskCard from "@/components/TaskCard";
import { detailsToRows } from "@/components/dataToRows";

export const metadata: Metadata = {
  title: "UFC Autobots • Details",
};

interface DetailsPageProps {
  params: { botId: string, taskId: string };
}

interface ExecutionDetailsResponse {
  content: string[];
}

interface GetTaskResponse {
  content: string[],
  error?: string;
}

async function getTaskById(id: string): Promise<GetTaskResponse | Error> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/task?id=${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return { message: "failed to fetch data" };
  }

  return response.json();
}

async function getExecutionDetails(id: string): Promise<ExecutionDetailsResponse | Error> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/details?id=${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return { message: "Failed to fetch data" };
  }

  return response.json();
}

export default async function Details({ params }: DetailsPageProps) {
  const details = await getExecutionDetails(params.taskId);
  const task = await getTaskById(params.taskId);

  const headers = ["Data / Hora", "Mensagem"]

  console.log(task)

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col">
        <h2 className="text-description text-3xl">
          Bot <span className="text-primary">{params.botId}</span>
        </h2>
      </section>
      {!isError(task) && (
        <section className="w-full my-2">
          <TaskCard content={task.content} /> 
        </section>
      )}
      <section className="w-full my-4 py-4 overflow-x-auto">
        <h2 className="text-description text-xl mb-2">
          Detalhes da execução 
        </h2>
        <Table>
          <TableHeader headers={headers} />
          {!isError(details) && <TableBody rows={detailsToRows(details.content)} />}
        </Table>
      </section>
      <section className="flex w-full p-4 justify-end">
        <LinkButton path={`/robot/${params.botId}`}>Voltar</LinkButton>
      </section>
    </main>
  );
}
