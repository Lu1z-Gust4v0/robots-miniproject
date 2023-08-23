"use client";
import Carousel from "@/components/carousel/Carousel";
import CarouselSlide from "@/components/carousel/CarouselSlide";
import useWindowSize from "@/hooks/useWindowSize";
import RobotCard from "@/components/RobotCard";
import { robots } from "@/data/robots"

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
        {robots.map((robot, index) => (
          <CarouselSlide
            className="flex justify-center px-4 py-6 items-center md:w-1/2 lg:w-1/3 xl:w-1/4"
            key={"slide-" + index}
            position={index}
          >
            <RobotCard
              id={robot.id}
              name={robot.name}
              description={robot.description}
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}
