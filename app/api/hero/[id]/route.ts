import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import type { HeroSlide } from "@/lib/types";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const items = await readData<HeroSlide>("hero.json");

  const index = items.findIndex((i) => i.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Slide tidak ditemukan" }, { status: 404 });
  }

  items[index] = {
    ...items[index],
    image: body.image ?? items[index].image,
    caption: body.caption ?? items[index].caption,
  };

  await writeData("hero.json", items);
  return NextResponse.json(items[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const items = await readData<HeroSlide>("hero.json");
  const filtered = items.filter((i) => i.id !== params.id);

  await writeData("hero.json", filtered);
  return NextResponse.json({ success: true });
}
