import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/db";
import type { Service, PortfolioItem, NewsItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const message: string = body?.message;
  const history: { role: "user" | "assistant"; content: string }[] = Array.isArray(body?.history)
    ? body.history
    : [];

  if (!message || typeof message !== "string" || message.length > 1000) {
    return NextResponse.json({ error: "Pesan tidak valid." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chatbot belum dikonfigurasi (API key belum diisi)." },
      { status: 500 }
    );
  }

  const [services, portfolio, news] = await Promise.all([
    readData<Service>("services.json"),
    readData<PortfolioItem>("portfolio.json"),
    readData<NewsItem>("news.json"),
  ]);

  const companyContext = `
Nama perusahaan: PT Perkebunan Nusantara IV (PTPN IV) Regional Sumatera Utara
Alamat: Jl. Sei Batang Hari No.2, Simpang Tj., Kec. Medan Sunggal, Kota Medan, Sumatera Utara, Indonesia
Telepon: (061) 4534 XXX
Email: info@ptpn4.co.id

Layanan / bidang usaha:
${services.map((s) => `- ${s.title}: ${s.description}`).join("\n")}

Unit usaha & portofolio:
${portfolio.map((p) => `- ${p.title} (${p.category}) di ${p.location}`).join("\n")}

Berita terbaru:
${news.slice(0, 5).map((n) => `- ${n.title}`).join("\n")}
`.trim();

  const FALLBACK_MESSAGE =
    "Baik, untuk pertanyaan Anda seputar perusahaan ini, nanti akan di balas secara personal oleh Admin kami dalam jam operasional minimal 2x24 jam 🙏🏻";

  const systemPrompt = `Kamu adalah asisten virtual resmi di website PT Perkebunan Nusantara IV REGIONAL I (PTPN IV).

Ikuti urutan pengambilan keputusan ini PERSIS, cek dari atas ke bawah:

LANGKAH 1 - CEK DATA DULU: Baca "Data resmi perusahaan" di bawah. Jika pertanyaan pengunjung jawabannya ADA di data itu (misalnya nomor 1: daftar layanan, unit usaha, alamat, telepon, email, berita), WAJIB jawab langsung dan lengkap berdasarkan data tersebut. Ini prioritas paling utama, JANGAN pernah balas fallback kalau jawabannya sebenarnya ada di data.

Contoh wajib dijawab langsung: "Apa saja layanan PTPN IV?" -> sebutkan daftar layanan dari data. "Di mana alamat kantor?" -> sebutkan alamat dari data.

LANGKAH 2 - KALAU AMBIGU: Jika pertanyaan berkaitan dengan PTPN IV tapi maksudnya kurang jelas/terlalu umum sehingga kamu tidak yakin harus jawab apa, JANGAN langsung anggap tidak tahu. Tanyakan balik dengan sopan untuk klarifikasi, contoh: "Maaf, saya kurang mengerti maksud pertanyaan Anda. Bisa dijelaskan lebih lanjut?"

LANGKAH 3 - KALAU TOPIKNYA JELAS TAPI DATANYA TIDAK ADA: Jika pertanyaan JELAS tentang PTPN IV (misalnya gaji karyawan, lowongan kerja, laporan keuangan detail, prosedur internal) tapi jawabannya TIDAK ADA sama sekali di data di bawah, balas PERSIS kalimat ini tanpa tambahan apapun: "${FALLBACK_MESSAGE}"

LANGKAH 4 - KALAU DI LUAR TOPIK: Jika pertanyaan SAMA SEKALI tidak berkaitan dengan PTPN IV (matematika, coding, gosip, politik, hiburan, olahraga, dll), balas PERSIS kalimat ini juga: "${FALLBACK_MESSAGE}"

ATURAN LAIN:
- Jangan pernah mengarang informasi yang tidak ada di data.
- Jawab dengan Bahasa Indonesia yang ramah, sopan, dan singkat (maksimal 4-5 kalimat), kecuali sedang mengucapkan kalimat fallback atau klarifikasi di atas.
- Dan ingat ini adalah PTPN IV REGIONAL I

Data resmi perusahaan saat ini:
${companyContext}`;

  try {
    const contents = [
      ...history.slice(-8).map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const callGemini = () =>
      fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
          }),
        }
      );

    let response = await callGemini();
    let data = await response.json();

    // Model Gemini kadang sibuk (503) -- coba ulang otomatis sampai 2x
    // dengan jeda singkat sebelum benar-benar menyerah.
    let attempt = 0;
    while (!response.ok && data?.error?.code === 503 && attempt < 2) {
      attempt++;
      await new Promise((r) => setTimeout(r, 1200 * attempt));
      response = await callGemini();
      data = await response.json();
    }

    if (!response.ok) {
      console.error("[chatbot] Gemini API error:", JSON.stringify(data));
      const isOverloaded = data?.error?.code === 503;
      return NextResponse.json(
        {
          error: isOverloaded
            ? "Server AI sedang sibuk banget nih, coba kirim ulang pertanyaannya beberapa detik lagi ya 🙏🏻"
            : "Chatbot sedang bermasalah, coba lagi sebentar lagi.",
        },
        { status: 500 }
      );
    }

    const reply: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || FALLBACK_MESSAGE;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[chatbot] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada chatbot. Coba lagi nanti." },
      { status: 500 }
    );
  }
}