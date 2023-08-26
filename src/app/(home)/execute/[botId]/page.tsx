import type { Metadata } from "next";
import FileUploader from "@/components/FileUploader";
import { isError } from "@/utils/error";
import { getCredentials } from "@/utils/credentials";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "UFC Autobots • Execute",
};

interface ExecutePageProps {
  params: { botId: string }
}

export default async function Execute({ params }: ExecutePageProps) {
  const credentials = await getCredentials()
  
  if (isError(credentials)) {
    console.log(credentials.message);

    redirect("/login");
  }  

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col">
        <h2 className="text-description text-3xl">
          Executar Bot <span className="text-primary">{params.botId}</span>
        </h2>
        <h3 className="text-description text-xl">Selecione as planilhas</h3>
      </section>
      <section>
        <FileUploader botId={params.botId} />
      </section> 
    </main>
  ) 
}
