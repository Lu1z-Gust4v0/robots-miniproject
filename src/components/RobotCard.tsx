"use client"
import Link from "next/link";
import { BsRobot } from "react-icons/bs";

interface RobotCardProps {
  id: string;
  name: string;
  description: string;
}

export default function RobotCard({ id, name, description }: RobotCardProps) {
  return (
    <section className="flex flex-col py-4 px-6 items-center justify-between h-full w-[285px] shadow-lg rounded-lg">
      <h2 className="text-4xl text-primary font-bold capitalize">{name}</h2>
      <BsRobot className="text-description h-24 w-20" />
      <p className="justify-self-start text-description text-[0.9rem]">{description.slice(0, 100)}</p>
      <Link
        href={"/"}
        className="block bg-primary text-white py-2 px-4 rounded-md transition-all duration-200 ease-out hover:scale-105 hover:bg-accent focus:scale-105 focus:bg-accent"
      >
        Selecionar 
      </Link>
    </section>
  );
}
