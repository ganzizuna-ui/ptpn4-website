import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import type { PortfolioItem } from "@/lib/types";

export async function GET() {
  const items = await readData<PortfolioItem>("portfolio.json");
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const items = await readData<PortfolioItem>("portfolio.json");

  const newItem: PortfolioItem = {
    id: generateId(),
    title: body.title,
    category: body.category,
    location: body.location,
    image: body.image || "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
  };

  items.push(newItem);
  await writeData("portfolio.json", items);

  return NextResponse.json(newItem, { status: 201 });
}
