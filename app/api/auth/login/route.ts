import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const success = await login(username, password);

  if (!success) {
    return NextResponse.json(
      { error: "Username atau password salah." },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
