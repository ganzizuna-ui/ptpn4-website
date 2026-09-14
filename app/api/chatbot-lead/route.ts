import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import type { ContactMessage } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const name: string = (body?.name || "").trim();
  const contact: string = (body?.contact || "").trim();
  const question: string = (body?.question || "").trim();

  if (!name || !contact || !question) {
    return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 });
  }

  // Simpan ke tabel "messages" yang SAMA dengan form kontak biasa, supaya
  // langsung muncul di menu "Pesan Masuk" admin tanpa perlu halaman baru.
  const messages = await readData<ContactMessage>("messages.json");

  // Deteksi sederhana: kalau "contact" mengandung "@" anggap email, kalau
  // tidak anggap nomor telepon/WhatsApp.
  const isEmail = contact.includes("@");

  const newMessage: ContactMessage = {
    id: generateId(),
    name,
    email: isEmail ? contact : "-",
    phone: isEmail ? "-" : contact,
    subject: "Pertanyaan dari Chatbot Website",
    message: question,
    createdAt: new Date().toISOString(),
    read: false,
  };

  messages.unshift(newMessage);
  await writeData("messages.json", messages);

  return NextResponse.json({ success: true }, { status: 201 });
}