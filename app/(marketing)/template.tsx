"use client";

// Next.js me-remount file ini setiap kali pindah halaman (klik menu Beranda,
// Tentang Kami, Berita, dst), sehingga animasi fade-in di bawah otomatis
// terpicu ulang tiap perpindahan halaman -> terasa halus/smooth.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-fade">{children}</div>;
}