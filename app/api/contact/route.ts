import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import type { ContactMessage } from "@/lib/types";

export async function GET() {
  const messages = await readData<ContactMessage>("messages.json");
  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Nama, email, dan pesan wajib diisi." },
      { status: 400 }
    );
  }

  const messages = await readData<ContactMessage>("messages.json");

  const newMessage: ContactMessage = {
    id: generateId(),
    name: body.name,
    email: body.email,
    phone: body.phone || "-",
    subject: body.subject || "Umum",
    message: body.message,
    createdAt: new Date().toISOString(),
    read: false,
  };

  messages.unshift(newMessage);
  await writeData("messages.json", messages);

  // NOTE: Untuk mengirim email notifikasi sungguhan, integrasikan
  // layanan seperti Resend/Nodemailer di sini.

  return NextResponse.json(
    { success: true, message: "Pesan berhasil dikirim!" },
    { status: 201 }
  );
}
