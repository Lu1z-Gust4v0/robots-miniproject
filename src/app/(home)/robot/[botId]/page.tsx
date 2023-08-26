import {
  Table,
  TableBody,
  TableHeader,
} from "@/components/Table";
import type { Metadata } from "next";
import { Error, isError } from "@/utils/error";
import LinkButton from "@/components/LinkButton";
import { historyToRows } from "@/components/dataToRows";

export const metadata: Metadata = {
  title: "UFC Autobots • Robot",
};

interface RobotPageProps {
  params: { botId: string };
}

interface GetDataResponse {
  content: string[];
}

async function getData(id: string): Promise<GetDataResponse | Error> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/robot?id=${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return { message: "Failed to fetch data" };
  }

  return response.json();
}
 
export default async function Robot({ params }: RobotPageProps) {
  const data = await getData(params.botId);

  const headers = ["Data / Hora", "Task", "Status", "Detalhes"];

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col">
        <h2 className="text-description text-3xl">
          Bot <span className="text-primary">{params.botId}</span>
        </h2>
        <h3 className="text-description">Histórico de execuções</h3>
      </section>
      <section className="w-full my-4 py-4 overflow-x-auto">
        <Table>
          <TableHeader headers={headers} />
          {!isError(data) && <TableBody rows={historyToRows(data.content, params.botId)} />}
        </Table>
      </section>
      <section className="flex w-full p-4 gap-4 justify-end">
        <LinkButton path="/">Voltar</LinkButton>
        <LinkButton path={`/confirm/${params.botId}`}>Nova execução</LinkButton>
      </section>
    </main>
  );
}
