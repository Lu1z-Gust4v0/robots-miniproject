"use client";
import Carousel from "@/components/carousel/Carousel";
import CarouselSlide from "@/components/carousel/CarouselSlide";
import useWindowSize from "@/hooks/useWindowSize";
import RobotCard from "@/components/RobotCard";

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function CarouselSection() {
  const { width } = useWindowSize();
  const slidesCount = width >= 1200
    ? 4
    : width >= 1025
    ? 3
    : width >= 768
    ? 2
    : 1;

  return (
    <section className="flex w-full items-center py-8">
      <Carousel
        show={slidesCount}
      >
        {NUMBERS.map((number, index) => (
          <CarouselSlide
            className="flex justify-center px-4 py-6 items-center md:w-1/2 lg:w-1/3 xl:w-1/4"
            key={"number-" + number}
            position={index}
          >
            <RobotCard
              id={"robot-" + number}
              name={"robot " + number}
              description={"Bot responsabel por fazer web scrapping e analise de linguagem natural"}
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}
