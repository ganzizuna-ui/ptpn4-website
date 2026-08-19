import { createClient } from "@supabase/supabase-js";

/**
 * Supabase admin client — HANYA dipakai di server (API routes & Server
 * Components), tidak pernah diimpor ke komponen "use client". Memakai
 * SERVICE ROLE KEY sehingga bisa baca/tulis tabel tanpa terhalang RLS.
 *
 * Isi nilai berikut di file .env.local (lihat .env.local.example):
 *   NEXT_PUBLIC_SUPABASE_URL=
 *   SUPABASE_SERVICE_ROLE_KEY=
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diisi di .env.local"
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl || "",
  serviceRoleKey || "",
  {
    auth: { persistSession: false },
  }
);

export const UPLOAD_BUCKET = "uploads";
