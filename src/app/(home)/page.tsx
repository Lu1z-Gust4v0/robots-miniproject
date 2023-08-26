import type { Metadata } from "next"
import CarouselSection from "@/components/CarouselSection";
import { isError } from "@/utils/error";
import { getCredentials } from "@/utils/credentials";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "UFC Autobots • Home",
  description: "Projeto para o processo seletivo",
}

export default async function Home() {
  const credentials = await getCredentials()
  
  if (isError(credentials)) {
    console.log(credentials.message);

    redirect("/login");
  }
  
  const USERNAME = !isError(credentials) ? credentials.content[0] : "" 

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col w-full">
        <h1 className="text-description text-2xl">
          Bem-vindo, <span className="text-primary">{USERNAME}</span>
        </h1>
        <p className="text-description">Selecione um bot</p>
      </section>
      <CarouselSection /> 
    </main>
  );
}
