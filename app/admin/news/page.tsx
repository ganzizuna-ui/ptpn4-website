"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import Modal from "@/components/admin/Modal";
import type { NewsItem } from "@/lib/types";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/news");
    setNews(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(item: NewsItem) {
    setEditing(item);
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (editing) {
      await fetch(`/api/news/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setModalOpen(false);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <AdminShell title="Kelola Berita" description="Tambah, ubah, atau hapus berita & artikel">
      <div className="flex justify-end mb-6">
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-900 text-white text-sm font-semibold hover:bg-brand-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tulis Berita
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Memuat data...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-zinc-600">Judul</th>
                <th className="text-left px-5 py-3 font-semibold text-zinc-600 hidden sm:table-cell">Tanggal</th>
                <th className="text-right px-5 py-3 font-semibold text-zinc-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {news.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 text-zinc-900 font-medium">{item.title}</td>
                  <td className="px-5 py-4 text-zinc-500 hidden sm:table-cell">{item.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Ubah
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Ubah Berita" : "Tulis Berita Baru"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Judul</label>
              <input
                name="title"
                defaultValue={editing?.title}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Ringkasan (Excerpt)</label>
              <textarea
                name="excerpt"
                defaultValue={editing?.excerpt}
                required
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Isi Berita</label>
              <textarea
                name="content"
                defaultValue={editing?.content}
                required
                rows={6}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">URL Gambar</label>
              <input
                name="image"
                defaultValue={editing?.image}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Tanggal</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={editing?.date}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Penulis</label>
                <input
                  name="author"
                  defaultValue={editing?.author || "Humas PTPN IV"}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-colors"
            >
              {editing ? "Simpan Perubahan" : "Publikasikan Berita"}
            </button>
          </form>
        </Modal>
      )}
    </AdminShell>
  );
}
