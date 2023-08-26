import { Error } from "./error";

interface GetCredentialsResponse {
  content: string[];
}

export async function getCredentials(): Promise<GetCredentialsResponse | Error> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/credentials`,
    {
      cache: "no-store",
    },
  );
  
  const data = await response.json();

  if (!response.ok) {
    return { message: data.message };
  }

  return data;
}
