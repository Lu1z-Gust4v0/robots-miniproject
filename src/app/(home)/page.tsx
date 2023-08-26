"use client"
import CarouselSection from "@/components/CarouselSection";
import { fetcher } from "@/utils/credentials";
import { redirect } from "next/navigation";
import useSWR from "swr"

export default function Home() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/credentials`, fetcher);  

  if (data && !data.content) {
    console.log(data);

    redirect("/login");
  }
  
  const USERNAME = data?.content ? data.content[0] : ""; 

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
