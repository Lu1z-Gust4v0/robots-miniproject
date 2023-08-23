import { Table, TableHeader, TableBody, historyToRows } from "@/components/Table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UFC Autobots • Robot",
};

interface RobotPageProps {
  params: { id: string };
}

interface GetDataResponse {
  content: string[]
}

interface Error {
  message: string;
}

function isError(input: unknown): input is Error {
  if ((input as Error).message !== undefined) {
    return true
  }
  return false
}



async function getData(id: string): Promise<GetDataResponse | Error> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/robot?id=${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return { message: "Failed to fetch data" }
  }

  return response.json();
}

export default async function Robot({ params }: RobotPageProps) {
  const data = await getData(params.id)

  const headers = ["Data / Hora", "Task", "Status", "Detalhes"]

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col">
        <h2 className="text-description text-2xl">Bot <span className="text-primary">{params.id}</span></h2>
        <h3 className="text-description">Histórico de execuções</h3>
      </section>
      <Table>
        <TableHeader headers={headers}/>
        {!isError(data) && <TableBody rows={historyToRows(data.content)}/>}
      </Table>
    </main>
  );
}
