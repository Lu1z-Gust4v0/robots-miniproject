import type { Metadata } from "next"
import RecoverForm from "@/components/RecoverForm";

export const metadata: Metadata = {
  title: "UFC Autobots • Recover",
}

export default async function Recover() {
  return (
    <main className="flex flex-col items-center min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <RecoverForm /> 
    </main>
  );
}
