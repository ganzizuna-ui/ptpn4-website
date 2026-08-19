import { Briefcase, Image as ImageIcon, Newspaper, MessageSquare } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { readData } from "@/lib/db";
import type { Service, PortfolioItem, NewsItem, ContactMessage } from "@/lib/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [services, portfolio, news, messages] = await Promise.all([
    readData<Service>("services.json"),
    readData<PortfolioItem>("portfolio.json"),
    readData<NewsItem>("news.json"),
    readData<ContactMessage>("messages.json"),
  ]);

  const unreadCount = messages.filter((m) => !m.read).length;

  const stats = [
    { label: "Layanan", value: services.length, icon: Briefcase, href: "/admin/services" },
    { label: "Portofolio", value: portfolio.length, icon: ImageIcon, href: "/admin/portfolio" },
    { label: "Berita", value: news.length, icon: Newspaper, href: "/admin/news" },
    { label: "Pesan Baru", value: unreadCount, icon: MessageSquare, href: "/admin/messages" },
  ];

  return (
    <AdminShell
      title="Dashboard"
      description="Ringkasan konten website PTPN IV"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="p-6 rounded-2xl bg-white border border-zinc-200 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center mb-4">
              <stat.icon className="w-5 h-5 text-zinc-700" />
            </div>
            <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-white border border-zinc-200">
        <h2 className="font-bold text-zinc-900 mb-4">Pesan Terbaru</h2>
        {messages.length === 0 ? (
          <p className="text-sm text-zinc-500">Belum ada pesan masuk.</p>
        ) : (
          <div className="divide-y divide-zinc-100">
            {messages.slice(0, 5).map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-zinc-900 text-sm truncate">{m.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{m.subject} — {m.message}</p>
                </div>
                {!m.read && (
                  <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-900 text-white">
                    Baru
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
