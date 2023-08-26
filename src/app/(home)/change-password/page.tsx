import type { Metadata } from "next";
import { isError } from "@/utils/error";
import { getCredentials } from "@/utils/credentials";
import { redirect } from "next/navigation";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export const metadata: Metadata = {
  title: "UFC Autobots • ChangePassord",
};

export default async function Home() {
  const credentials = await getCredentials();

  if (isError(credentials)) {
    console.log(credentials.message);

    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      {!isError(credentials) && <ChangePasswordForm credentials={credentials.content}/>}
    </main>
  );
}
