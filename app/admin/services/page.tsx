"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import Modal from "@/components/admin/Modal";
import { getIcon, availableIcons } from "@/lib/icon-map";
import type { Service } from "@/lib/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/services");
    setServices(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(service: Service) {
    setEditing(service);
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (editing) {
      await fetch(`/api/services/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setModalOpen(false);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <AdminShell title="Kelola Layanan" description="Tambah, ubah, atau hapus data layanan/bidang usaha">
      <div className="flex justify-end mb-6">
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-900 text-white text-sm font-semibold hover:bg-brand-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Layanan
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Memuat data...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div key={service.id} className="p-5 rounded-2xl bg-white border border-zinc-200">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-zinc-700" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">{service.title}</h3>
                <p className="text-sm text-zinc-600 mb-4 line-clamp-2">{service.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(service)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Ubah
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Ubah Layanan" : "Tambah Layanan"} onClose={() => setModalOpen(false)}>
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
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Icon</label>
              <select
                name="icon"
                defaultValue={editing?.icon || "Leaf"}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
              >
                {availableIcons.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Deskripsi</label>
              <textarea
                name="description"
                defaultValue={editing?.description}
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-colors"
            >
              {editing ? "Simpan Perubahan" : "Tambah Layanan"}
            </button>
          </form>
        </Modal>
      )}
    </AdminShell>
  );
}
