import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, UPLOAD_BUCKET } from "@/lib/supabase";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  // Sub-folder tujuan, mis. "hero" -> disimpan ke bucket/hero/namafile.jpg
  const folder = (formData.get("folder") as string) || "misc";

  if (!file) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF." },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Ukuran file maksimal 8MB." },
      { status: 400 }
    );
  }

  const safeFolder = folder.replace(/[^a-z0-9-_]/gi, "");
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const storagePath = `${safeFolder}/${fileName}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabaseAdmin.storage
    .from(UPLOAD_BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("[upload] Gagal upload ke Supabase Storage:", uploadError.message);
    return NextResponse.json(
      { error: "Gagal mengunggah gambar. Pastikan bucket 'uploads' sudah dibuat di Supabase." },
      { status: 500 }
    );
  }

  const { data: publicUrlData } = supabaseAdmin.storage
    .from(UPLOAD_BUCKET)
    .getPublicUrl(storagePath);

  return NextResponse.json({ path: publicUrlData.publicUrl });
}
