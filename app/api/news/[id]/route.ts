import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import type { NewsItem } from "@/lib/types";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const news = await readData<NewsItem>("news.json");
  const index = news.findIndex((s) => s.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
  }

  news[index] = { ...news[index], ...body };
  await writeData("news.json", news);

  return NextResponse.json(news[index]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const news = await readData<NewsItem>("news.json");
  const filtered = news.filter((s) => s.id !== params.id);
  await writeData("news.json", filtered);

  return NextResponse.json({ success: true });
}
