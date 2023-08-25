import type { Metadata } from "next";
import ConfirmDataForm from "@/components/ConfirmDataForm";
import LinkButton from "@/components/LinkButton";

export const metadata: Metadata = {
  title: "UFC Autobots • Confirm",
};

interface ConfirmPageProps {
  params: { botId: string };
}

export default async function Confirm({ params }: ConfirmPageProps) {
  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col">
        <h2 className="text-description text-3xl">
          Executar Bot <span className="text-primary">{params.botId}</span>
        </h2>
      </section>
      <section className="w-full my-8">  
        <ConfirmDataForm botId={params.botId} />
      </section>
      <section className="flex w-full p-4 justify-end">
        <LinkButton path={`/robot/${params.botId}`}>Voltar</LinkButton>
      </section>
    </main>
  )
}
