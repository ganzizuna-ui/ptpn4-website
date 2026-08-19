"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import Modal from "@/components/admin/Modal";
import type { PortfolioItem } from "@/lib/types";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/portfolio");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(item: PortfolioItem) {
    setEditing(item);
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (editing) {
      await fetch(`/api/portfolio/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setModalOpen(false);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus item portofolio ini?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <AdminShell title="Kelola Portofolio" description="Tambah, ubah, atau hapus unit usaha/proyek">
      <div className="flex justify-end mb-6">
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-900 text-white text-sm font-semibold hover:bg-brand-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Item
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Memuat data...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white border border-zinc-200 overflow-hidden">
              <div className="relative aspect-video">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-zinc-500">{item.category}</span>
                <h3 className="font-bold text-zinc-900 mt-1 mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 mb-4">{item.location}</p>
                <div className="flex gap-2">
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
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Ubah Item Portofolio" : "Tambah Item Portofolio"} onClose={() => setModalOpen(false)}>
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
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Kategori</label>
              <input
                name="category"
                defaultValue={editing?.category}
                required
                placeholder="Kelapa Sawit / Karet / Pabrik Pengolahan"
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Lokasi</label>
              <input
                name="location"
                defaultValue={editing?.location}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
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
              <p className="text-xs text-zinc-400 mt-1">
                Tempel URL gambar (mis. dari Unsplash) atau upload manual ke /public/uploads.
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-colors"
            >
              {editing ? "Simpan Perubahan" : "Tambah Item"}
            </button>
          </form>
        </Modal>
      )}
    </AdminShell>
  );
}
