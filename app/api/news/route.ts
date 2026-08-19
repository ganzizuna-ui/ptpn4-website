import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import type { NewsItem } from "@/lib/types";

export async function GET() {
  const news = await readData<NewsItem>("news.json");
  return NextResponse.json(news);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const news = await readData<NewsItem>("news.json");

  const slug = (body.title as string)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const newItem: NewsItem = {
    id: generateId(),
    slug,
    title: body.title,
    excerpt: body.excerpt,
    content: body.content,
    image: body.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    date: body.date || new Date().toISOString().slice(0, 10),
    author: body.author || "Humas PTPN IV",
  };

  news.unshift(newItem);
  await writeData("news.json", news);

  return NextResponse.json(newItem, { status: 201 });
}
