import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm"

export const metadata: Metadata = {
  title: "UFC Autobots • Login",
  description: "Projeto para o processo seletivo",
};

export default function Login() {
  return (
    <main className="flex flex-col items-center min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <LoginForm /> 
    </main>
  );
}
