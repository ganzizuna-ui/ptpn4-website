import Image from "next/image";
import { MapPin } from "lucide-react";
import { readData } from "@/lib/db";
import type { PortfolioItem } from "@/lib/types";

// Warna badge kategori dibuat berbeda-beda supaya kartu portofolio terasa
// lebih hidup, sekaligus membantu pengunjung membedakan jenis unit usaha
// sekilas pandang. Kategori yang tidak terdaftar di sini otomatis pakai
// warna default (putih/netral).
const categoryColors: Record<string, string> = {
  "Kelapa Sawit": "bg-brand-600 text-white",
  Karet: "bg-gold-500 text-white",
  "Pabrik Pengolahan": "bg-sky-600 text-white",
  Kemitraan: "bg-orange-500 text-white",
};

function getCategoryClass(category: string) {
  return categoryColors[category] || "bg-white/90 text-zinc-900 backdrop-blur";
}

export default async function Portfolio() {
  const items = await readData<PortfolioItem>("portfolio.json");

  return (
    <section id="portofolio" className="scroll-mt-20 py-16 sm:py-24 bg-gradient-to-b from-gold-50/40 to-zinc-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            Portofolio
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
            Unit Usaha & Proyek Kami
          </h2>
          <p className="mt-4 text-zinc-600">
            Sebaran unit kebun dan fasilitas pengolahan yang kami kelola di
            wilayah Sumatera Utara.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-brand-900 aspect-[4/5]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryClass(item.category)}`}>
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-zinc-300 text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}