"use client";
import Carousel from "@/components/carousel/Carousel";
import CarouselSlide from "@/components/carousel/CarouselSlide";
import useWindowSize from "@/hooks/useWindowSize";

const USERNAME = "Gustavo";
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Home() {
  const { width } = useWindowSize();
  const slidesCount = width >= 1200
    ? 4
    : width >= 1025
    ? 3
    : width >= 768
    ? 2
    : 1;

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col w-full">
        <h1 className="text-description text-2xl">
          Bem-vindo, <span className="text-primary">{USERNAME}</span>
        </h1>
        <p className="text-description">Selecione um bot</p>
      </section>
      <section className="flex w-full items-center py-8">
        <Carousel 
          show={slidesCount}
          className="border border-red-500"
        >
          {NUMBERS.map((number, index) => (
            <CarouselSlide
              className="flex justify-center border border-blue-500 items-center md:w-1/2 lg:w-1/3 xl:w-1/4"
              key={"number-" + number}
              position={index}
            >
              {number}
            </CarouselSlide>
          ))}
        </Carousel>
      </section>
    </main>
  );
}
