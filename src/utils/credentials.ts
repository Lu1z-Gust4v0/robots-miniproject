import { Error } from "./error";

interface GetCredentialsResponse {
  message?: string;
  content?: string[];
}

export async function getCredentials(): Promise<
  GetCredentialsResponse | Error
> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/credentials`,
    {
      cache: "no-store",
    },
  );

  return response.json();
}

type CredentialsFetcher = (url: string) => Promise<GetCredentialsResponse>

export const fetcher: CredentialsFetcher = (url: string) => fetch(url).then((r) => r.json()) 

  
