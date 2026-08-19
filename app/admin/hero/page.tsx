"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, UploadCloud, Loader2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import Modal from "@/components/admin/Modal";
import type { HeroSlide } from "@/lib/types";

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);

  // State form modal
  const [caption, setCaption] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/hero");
    setSlides(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreate() {
    setEditing(null);
    setCaption("");
    setImagePath("");
    setModalOpen(true);
  }

  function openEdit(slide: HeroSlide) {
    setEditing(slide);
    setCaption(slide.caption);
    setImagePath(slide.image);
    setModalOpen(true);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "hero");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal mengunggah gambar");
        return;
      }
      setImagePath(data.path);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imagePath) {
      alert("Silakan unggah atau isi gambar terlebih dahulu.");
      return;
    }

    setSaving(true);
    try {
      const payload = { image: imagePath, caption };

      if (editing) {
        await fetch(`/api/hero/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/hero", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setModalOpen(false);
      loadData();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus gambar slider ini?")) return;
    await fetch(`/api/hero/${id}`, { method: "DELETE" });
    loadData();
  }

  async function moveSlide(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;

    const reordered = [...slides];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setSlides(reordered);

    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: reordered.map((s) => s.id) }),
    });
  }

  return (
    <AdminShell
      title="Kelola Slider Beranda"
      description="Atur gambar yang tampil bergeser di halaman utama (Hero)"
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-900 text-white text-sm font-semibold hover:bg-brand-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Gambar
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Memuat data...</p>
      ) : slides.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Belum ada gambar slider. Klik &quot;Tambah Gambar&quot; untuk mulai.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="rounded-2xl bg-white border border-zinc-200 overflow-hidden"
            >
              <div className="relative aspect-[9/16] bg-zinc-100">
                {slide.image && (
                  <Image
                    src={slide.image}
                    alt={slide.caption || "Gambar slider"}
                    fill
                    className="object-cover"
                  />
                )}
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 text-brand-900">
                  Urutan {index + 1}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-zinc-900 truncate mb-2">
                  {slide.caption || "(Tanpa keterangan)"}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => moveSlide(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Naikkan urutan"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveSlide(index, 1)}
                    disabled={index === slides.length - 1}
                    className="p-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Turunkan urutan"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => openEdit(slide)}
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Ubah
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
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
        <Modal
          title={editing ? "Ubah Gambar Slider" : "Tambah Gambar Slider"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Gambar (rasio 9:16 disarankan)
              </label>

              {imagePath && (
                <div className="relative w-32 aspect-[9/16] rounded-lg overflow-hidden mb-3 bg-zinc-100">
                  <Image src={imagePath} alt="Pratinjau" fill className="object-cover" />
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
                id="hero-file-input"
              />
              <label
                htmlFor="hero-file-input"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-zinc-300 text-sm font-medium text-zinc-600 hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Mengunggah...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" /> Unggah dari Komputer
                  </>
                )}
              </label>

              <p className="text-xs text-zinc-400 mt-2 mb-1.5">Atau tempel URL gambar:</p>
              <input
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
                placeholder="/uploads/hero/foto.jpg atau https://..."
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Keterangan (opsional)
              </label>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Perkebunan Kelapa Sawit"
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full py-2.5 rounded-lg bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-colors disabled:opacity-60"
            >
              {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Tambah Gambar"}
            </button>
          </form>
        </Modal>
      )}
    </AdminShell>
  );
}
