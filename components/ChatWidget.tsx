"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Leaf } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Halo! Saya asisten virtual PTPN IV. Ada yang ingin ditanyakan seputar layanan, unit usaha, atau informasi perusahaan kami?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

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

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.ok ? data.reply : data.error || "Maaf, terjadi kesalahan.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, koneksi bermasalah. Coba lagi sebentar lagi." },
      ]);
    } finally {
      setLoading(false);
    }
  }

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
        <div className="fixed bottom-24 right-5 z-50 w-[min(360px,calc(100vw-2.5rem))] h-[min(500px,calc(100vh-9rem))] bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-fade-up">
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
          </div>

          <form onSubmit={sendMessage} className="flex-shrink-0 border-t border-zinc-200 p-3 flex items-center gap-2 bg-white">
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