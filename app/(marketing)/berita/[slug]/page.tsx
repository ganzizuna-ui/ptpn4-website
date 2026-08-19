import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { readData } from "@/lib/db";
import type { NewsItem } from "@/lib/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const dynamic = "force-dynamic";

export default async function BeritaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const news = await readData<NewsItem>("news.json");
  const article = news.find((n) => n.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="py-12 sm:py-20">
      <div className="container-custom max-w-3xl">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Berita
        </Link>

        <h1 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-5 text-sm text-zinc-500 mb-8">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(article.date)}
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {article.author}
          </div>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        <div className="prose prose-zinc max-w-none">
          <p className="text-zinc-700 leading-relaxed whitespace-pre-line">
            {article.content}
          </p>
        </div>
      </div>
    </article>
  );
}
