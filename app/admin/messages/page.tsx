"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import type { ContactMessage } from "@/lib/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/contact");
    setMessages(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function toggleRead(msg: ContactMessage) {
    await fetch(`/api/contact/${msg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !msg.read }),
    });
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <AdminShell title="Pesan Masuk" description="Daftar pesan dari formulir kontak website">
      {loading ? (
        <p className="text-sm text-zinc-500">Memuat data...</p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-zinc-500">Belum ada pesan masuk.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border bg-white ${
                msg.read ? "border-zinc-200" : "border-brand-700"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-zinc-900">{msg.name}</h3>
                    {!msg.read && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-900 text-white">
                        Baru
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {msg.email} • {msg.phone} • {formatDate(msg.createdAt)}
                  </p>
                  <p className="text-sm font-medium text-zinc-700 mt-3">{msg.subject}</p>
                  <p className="text-sm text-zinc-600 mt-1">{msg.message}</p>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleRead(msg)}
                    className="p-2 rounded-md border border-zinc-200 hover:bg-zinc-50 transition-colors"
                    title={msg.read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                  >
                    {msg.read ? (
                      <MailOpen className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <Mail className="w-4 h-4 text-zinc-900" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded-md border border-red-200 hover:bg-red-50 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
