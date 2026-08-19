import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import type { Service } from "@/lib/types";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const services = await readData<Service>("services.json");
  const index = services.findIndex((s) => s.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: "Layanan tidak ditemukan" }, { status: 404 });
  }

  services[index] = { ...services[index], ...body };
  await writeData("services.json", services);

  return NextResponse.json(services[index]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const services = await readData<Service>("services.json");
  const filtered = services.filter((s) => s.id !== params.id);
  await writeData("services.json", filtered);

  return NextResponse.json({ success: true });
}
