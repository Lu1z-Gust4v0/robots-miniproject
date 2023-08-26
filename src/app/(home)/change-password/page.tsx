import ChangePasswordForm from "@/components/ChangePasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UFC Autobots • ChangePassword",
};

export default async function ChangePassword() {
  return (
    <main className="flex flex-col items-center min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <ChangePasswordForm />
    </main>
  );
}
