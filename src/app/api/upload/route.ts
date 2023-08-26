import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.formData();
  
  body.forEach((file) => {
    console.log(file)
  })

  return NextResponse.json({ message: "hello world" });
}
