import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import type { HeroSlide } from "@/lib/types";

export async function GET() {
  const items = await readData<HeroSlide>("hero.json");
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const items = await readData<HeroSlide>("hero.json");

  const newItem: HeroSlide = {
    id: generateId(),
    image: body.image || "",
    caption: body.caption || "",
  };

  items.push(newItem);
  await writeData("hero.json", items);

  return NextResponse.json(newItem, { status: 201 });
}

// Dipakai untuk menyimpan ulang urutan slide setelah di-drag/reorder di admin
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const orderedIds: string[] = body.order;

  const items = await readData<HeroSlide>("hero.json");
  const itemsById = new Map(items.map((i) => [i.id, i]));

  const reordered = orderedIds
    .map((id) => itemsById.get(id))
    .filter((i): i is HeroSlide => Boolean(i));

  await writeData("hero.json", reordered);
  return NextResponse.json(reordered);
}
