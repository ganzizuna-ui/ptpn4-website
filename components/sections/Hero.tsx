import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-700 via-brand-800 to-brand-900 border-b border-brand-900">
      {/* Bentuk dekoratif blur di belakang konten -- memperkuat kesan hijau
          perkebunan & memberi efek visual tanpa mengganggu keterbacaan teks */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-200/40 blur-3xl pointer-events-none animate-pulse-slow"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-gold-200/40 blur-3xl pointer-events-none"
      />

      <div className="container-custom py-16 sm:py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 text-gold-600 text-xs font-semibold mb-6">
              <Leaf className="w-3.5 h-3.5" />
              BUMN Perkebunan Terbesar Indonesia
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Membangun Masa Depan{" "}
              <span className="text-gold-400">Perkebunan Indonesia</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-zinc-200 max-w-xl leading-relaxed">
              PT Perkebunan Nusantara IV berkomitmen mengelola sumber daya
              perkebunan kelapa sawit dan karet secara berkelanjutan, memberi
              nilai tambah bagi bangsa dan kesejahteraan masyarakat.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/tentang"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gold-500 text-brand-950 font-semibold hover:bg-gold-400 transition-colors group"
              >
                Selengkapnya
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#kontak"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Hubungi Kami
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/15 pt-8">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">30+</p>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">Unit Usaha</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gold-400">150K+</p>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">Hektar Lahan</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">20K+</p>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">Karyawan</p>
              </div>
            </div>
          </div>

          {/* Swipeable Image Slider */}
          <HeroSlider />
        </div>
      </div>
    </section>
  );
}