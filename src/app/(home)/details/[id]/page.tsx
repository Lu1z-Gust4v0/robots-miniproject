import { Table, TableBody, TableHeader, detailsToRows } from "@/components/Table";
import type { Metadata } from "next";
import { Error, isError } from "@/utils/error";
import LinkButton from "@/components/LinkButton";

export const metadata: Metadata = {
  title: "UFC Autobots • Details",
};

interface DetailsPageProps {
  params: { id: string };
}

interface GetDataResponse {
  content: string[];
}

async function getData(id: string): Promise<GetDataResponse | Error> {
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
  const data = await getData(params.id);

  const headers = ["Data / Hora", "Mensagem"]

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col">
        <h2 className="text-description text-3xl">
          Bot <span className="text-primary">{params.id}</span>
        </h2>
        <h3 className="text-description">Informações sobre a execução</h3>
      </section>
      <section className="w-full my-4 py-4 overflow-x-auto">
        <Table>
          <TableHeader headers={headers} />
          {!isError(data) && <TableBody rows={detailsToRows(data.content)} />}
        </Table>
      </section>
      <section className="flex w-full p-4 justify-end">
        <LinkButton path="/">Voltar</LinkButton>
      </section>
    </main>
  );
}
