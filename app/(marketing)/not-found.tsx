import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-7xl font-bold text-zinc-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">Halaman Tidak Ditemukan</h1>
      <p className="mt-2 text-zinc-500 max-w-md">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-colors"
      >
        <Home className="w-4 h-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
