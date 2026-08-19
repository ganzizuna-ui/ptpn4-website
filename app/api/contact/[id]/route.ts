import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import type { ContactMessage } from "@/lib/types";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const messages = await readData<ContactMessage>("messages.json");
  const index = messages.findIndex((m) => m.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Pesan tidak ditemukan" }, { status: 404 });
  }
  messages[index] = { ...messages[index], ...body };
  await writeData("messages.json", messages);
  return NextResponse.json(messages[index]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const messages = await readData<ContactMessage>("messages.json");
  const filtered = messages.filter((m) => m.id !== params.id);
  await writeData("messages.json", filtered);
  return NextResponse.json({ success: true });
}
