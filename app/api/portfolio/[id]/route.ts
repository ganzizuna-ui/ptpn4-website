import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import type { PortfolioItem } from "@/lib/types";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const items = await readData<PortfolioItem>("portfolio.json");
  const index = items.findIndex((s) => s.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: "Item tidak ditemukan" }, { status: 404 });
  }

  items[index] = { ...items[index], ...body };
  await writeData("portfolio.json", items);

  return NextResponse.json(items[index]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const items = await readData<PortfolioItem>("portfolio.json");
  const filtered = items.filter((s) => s.id !== params.id);
  await writeData("portfolio.json", filtered);

  return NextResponse.json({ success: true });
}
