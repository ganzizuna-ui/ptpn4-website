import { supabaseAdmin } from "@/lib/supabase";

/**
 * Helper baca/tulis data — sekarang berbasis Supabase (Postgres), bukan lagi
 * file JSON lokal. Ini penting untuk hosting gratis (Vercel dkk), karena
 * filesystem di sana bersifat sementara/read-only saat runtime — tulisan ke
 * file lokal akan hilang. Signature fungsi (readData/writeData/generateId)
 * sengaja dibuat SAMA seperti sebelumnya, supaya semua kode yang memanggilnya
 * (API routes, halaman) tidak perlu diubah satu per satu.
 *
 * "fileName" (mis. "services.json") dipetakan ke nama tabel Supabase
 * (mis. "services") — cukup buang akhiran .json.
 *
 * Urutan data dipertahankan lewat kolom tersembunyi "position" (integer),
 * supaya perilaku "array JSON berurutan" yang lama tetap sama persis.
 */

function toTableName(fileName: string): string {
  return fileName.replace(/\.json$/, "");
}

export async function readData<T>(fileName: string): Promise<T[]> {
  const table = toTableName(fileName);
  const { data, error } = await supabaseAdmin
    .from(table)
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error(`[db] Gagal membaca tabel "${table}":`, error.message);
    return [];
  }

  return (data || []) as T[];
}

export async function writeData<T extends { id: string }>(
  fileName: string,
  data: T[]
): Promise<void> {
  const table = toTableName(fileName);

  // Strategi sederhana: kosongkan tabel lalu tulis ulang semua baris sesuai
  // urutan array yang diberikan. Cocok untuk skala kecil-menengah seperti
  // company profile (jumlah baris per tabel biasanya puluhan, bukan jutaan).
  const { error: deleteError } = await supabaseAdmin
    .from(table)
    .delete()
    .neq("id", "__never_matches__");

  if (deleteError) {
    console.error(`[db] Gagal mengosongkan tabel "${table}":`, deleteError.message);
    throw new Error(deleteError.message);
  }

  if (data.length === 0) return;

  const rows = data.map((item, index) => ({ ...item, position: index }));
  const { error: insertError } = await supabaseAdmin.from(table).insert(rows);

  if (insertError) {
    console.error(`[db] Gagal menulis ke tabel "${table}":`, insertError.message);
    throw new Error(insertError.message);
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
