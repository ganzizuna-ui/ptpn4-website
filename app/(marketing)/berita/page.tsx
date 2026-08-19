import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { readData } from "@/lib/db";
import type { NewsItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Berita & Artikel | PTPN IV Medan",
  description: "Kumpulan berita dan artikel terbaru seputar PT Perkebunan Nusantara IV.",
};

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BeritaPage() {
  const news = await readData<NewsItem>("news.json");

  return (
    <div>
      <section className="bg-brand-900 py-20 sm:py-28">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Berita & Artikel
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Informasi dan perkembangan terbaru seputar PT Perkebunan Nusantara IV.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-custom">
          {news.length === 0 ? (
            <p className="text-center text-zinc-500">Belum ada berita yang dipublikasikan.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="group rounded-2xl overflow-hidden border border-zinc-200 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </div>
                    <h3 className="font-bold text-zinc-900 mb-2 line-clamp-2 group-hover:text-zinc-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-600 line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
