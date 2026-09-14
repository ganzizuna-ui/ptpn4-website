"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Leaf, CheckCircle2 } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// PENTING: teks ini harus SAMA PERSIS dengan FALLBACK_MESSAGE di
// app/api/chatbot/route.ts -- dipakai untuk mendeteksi kapan menampilkan
// form "tinggalkan kontak" ke pengunjung.
const FALLBACK_MESSAGE =
  "Baik, untuk pertanyaan Anda seputar perusahaan ini, nanti akan di balas secara personal oleh Admin kami dalam jam operasional minimal 2x24 jam 🙏🏻";

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Halo! Saya asisten virtual PTPN IV. Silakan pilih salah satu pertanyaan di bawah, atau tulis pertanyaan Anda sendiri.",
};

const QUICK_QUESTIONS = [
  "Apa saja layanan / bidang usaha PTPN IV?",
  "Di mana lokasi kantor PTPN IV?",
  "Bagaimana cara menghubungi perusahaan?",
  "Apa saja unit usaha/portofolio PTPN IV?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pertanyaan yang belum terjawab & menunggu diisi nama+kontak pengunjung
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, pendingQuestion]);

  async function sendText(text: string) {
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setPendingQuestion(null);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(0, -1),
        }),
      });
      const data = await res.json();
      const replyText: string = res.ok ? data.reply : data.error || "Maaf, terjadi kesalahan.";

      setMessages((prev) => [...prev, { role: "assistant", content: replyText }]);

      // Kalau balasannya adalah pesan fallback, tampilkan form kontak
      // supaya admin bisa menindaklanjuti pertanyaan ini secara personal.
      if (replyText === FALLBACK_MESSAGE) {
        setPendingQuestion(text);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, koneksi bermasalah. Coba lagi sebentar lagi." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendText(input.trim());
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!leadName.trim() || !leadContact.trim() || !pendingQuestion || leadSubmitting) return;

    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/chatbot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          contact: leadContact.trim(),
          question: pendingQuestion,
        }),
      });

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Terima kasih, ${leadName.trim()}! Pertanyaan Anda sudah kami catat. Admin kami akan menghubungi Anda melalui ${leadContact.trim()} dalam waktu maksimal 2x24 jam pada jam operasional. 🙏🏻`,
          },
        ]);
        setPendingQuestion(null);
        setLeadName("");
        setLeadContact("");
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Maaf, gagal menyimpan data Anda. Silakan coba lagi." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, koneksi bermasalah. Coba lagi sebentar lagi." },
      ]);
    } finally {
      setLeadSubmitting(false);
    }
  }

  const showQuickQuestions = messages.length === 1 && !loading && !pendingQuestion;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup chat" : "Buka chat"}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-brand-900 hover:bg-brand-800 shadow-lg flex items-center justify-center transition-all hover:scale-105"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(360px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-9rem))] bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-fade-up">
          <div className="bg-brand-900 px-4 py-3.5 flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-4 h-4 text-brand-950" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Asisten PTPN IV</p>
              <p className="text-zinc-300 text-xs leading-tight">Biasanya balas dalam beberapa detik</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-zinc-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    msg.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-brand-900 text-white text-sm px-3.5 py-2.5 leading-relaxed"
                      : "max-w-[80%] rounded-2xl rounded-bl-sm bg-white border border-zinc-200 text-zinc-800 text-sm px-3.5 py-2.5 leading-relaxed"
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-white border border-zinc-200 px-3.5 py-2.5">
                  <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
                </div>
              </div>
            )}

            {showQuickQuestions && (
              <div className="flex flex-col gap-2 pt-1">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendText(q)}
                    className="text-left text-sm px-3.5 py-2.5 rounded-xl border border-brand-200 bg-white text-brand-800 hover:bg-brand-50 hover:border-brand-700 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Form tinggalkan kontak, muncul saat chatbot tidak bisa jawab */}
            {pendingQuestion && (
              <form
                onSubmit={handleLeadSubmit}
                className="bg-white border border-brand-200 rounded-xl p-3.5 space-y-2.5"
              >
                <p className="text-xs font-semibold text-brand-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Tinggalkan kontak Anda
                </p>
                <input
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Nama Anda"
                  disabled={leadSubmitting}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm outline-none focus:border-brand-700 disabled:bg-zinc-100"
                />
                <input
                  value={leadContact}
                  onChange={(e) => setLeadContact(e.target.value)}
                  placeholder="No. WhatsApp atau Email"
                  disabled={leadSubmitting}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm outline-none focus:border-brand-700 disabled:bg-zinc-100"
                />
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full py-2 rounded-lg bg-brand-900 text-white text-sm font-semibold hover:bg-brand-800 disabled:opacity-50 transition-colors"
                >
                  {leadSubmitting ? "Mengirim..." : "Kirim ke Admin"}
                </button>
              </form>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex-shrink-0 border-t border-zinc-200 p-3 flex items-center gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pertanyaan Anda..."
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 rounded-full border border-zinc-300 text-sm outline-none focus:border-brand-700 disabled:bg-zinc-100"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Kirim pesan"
              className="w-10 h-10 flex-shrink-0 rounded-full bg-brand-900 hover:bg-brand-800 disabled:opacity-40 flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}