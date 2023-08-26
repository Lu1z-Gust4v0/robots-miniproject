import Navbar from "@/components/Navbar";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "UFC Autobots • Home",
  description: "Projeto para o processo seletivo",
}

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
