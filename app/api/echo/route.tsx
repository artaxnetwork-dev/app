import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  const headers = Object.fromEntries(request.headers.entries());
  const url = request.url;
  const method = request.headers.get("method");

  return NextResponse.json({
    headers: headers,
    url: url,
    method: method,
    message: message
  });
}