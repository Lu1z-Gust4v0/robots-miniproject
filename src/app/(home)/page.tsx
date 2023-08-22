import type { Metadata } from "next"
import CarouselSection from "@/components/CarouselSection";

export const metadata: Metadata = {
  title: "UFC Autobots • Home",
  description: "Projeto para o processo seletivo",
}

const USERNAME = "Gustavo";

export default function Home() {
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
