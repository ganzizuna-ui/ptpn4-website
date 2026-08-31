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

  // Ambil data terbaru dari database supaya chatbot selalu menjawab sesuai
  // konten yang benar-benar tampil di website (bukan data yang sudah usang).
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

  const systemPrompt = `Kamu adalah asisten virtual resmi di website PT Perkebunan Nusantara IV (PTPN IV).

ATURAN KETAT yang harus selalu kamu ikuti:
1. Kamu HANYA boleh menjawab pertanyaan seputar: profil PTPN IV, layanan/bidang usaha, portofolio unit usaha, cara menghubungi perusahaan, jam operasional, berita perusahaan, atau informasi umum seputar perkebunan/BUMN yang relevan dengan PTPN IV.
2. Jika pengunjung bertanya di luar topik itu (misalnya matematika, coding, gosip artis, topik pribadi, politik, atau apa pun yang tidak berkaitan dengan PTPN IV), TOLAK dengan sopan dan arahkan kembali ke topik seputar perusahaan. Contoh: "Maaf, saya hanya bisa membantu pertanyaan seputar PTPN IV ya. Ada yang ingin ditanyakan tentang layanan atau perusahaan kami?"
3. Jangan pernah mengarang informasi yang tidak ada di data di bawah ini. Jika tidak tahu jawabannya, sarankan pengunjung menghubungi perusahaan lewat form kontak di halaman Kontak.
4. Jawab dengan Bahasa Indonesia yang ramah, sopan, dan singkat (maksimal 4-5 kalimat).

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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
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

    const data = await response.json();

    if (!response.ok) {
      console.error("[chatbot] Gemini API error:", JSON.stringify(data));
      return NextResponse.json(
        { error: "Chatbot sedang bermasalah, coba lagi sebentar lagi." },
        { status: 500 }
      );
    }

    const reply: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Maaf, saya belum bisa menjawab itu. Silakan hubungi kami lewat form kontak di halaman Kontak.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[chatbot] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada chatbot. Coba lagi nanti." },
      { status: 500 }
    );
  }
}