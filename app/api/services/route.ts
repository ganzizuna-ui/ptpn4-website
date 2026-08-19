import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import type { Service } from "@/lib/types";

export async function GET() {
  const services = await readData<Service>("services.json");
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const services = await readData<Service>("services.json");

  const newService: Service = {
    id: generateId(),
    icon: body.icon || "Leaf",
    title: body.title,
    description: body.description,
  };

  services.push(newService);
  await writeData("services.json", services);

  return NextResponse.json(newService, { status: 201 });
}
