import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UFC Autobots • Robot",
};

interface RobotPageProps {
  params: { id: string };
}

interface GetDataResponse {
  content: string[]
}

interface Error {
  message: string;
}

async function getData(id: string): Promise<GetDataResponse | Error> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/robot?id=${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return { message: "Failed to fetch data" }
  }

  return response.json();
}

export default async function Robot({ params }: RobotPageProps) {
  const data = await getData(params.id);

  console.log(data);

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      {params.id}
    </main>
  );
}
