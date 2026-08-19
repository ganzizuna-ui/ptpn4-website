"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Image as ImageIcon,
  GalleryHorizontal,
  Newspaper,
  MessageSquare,
  LogOut,
  ExternalLink,
} from "lucide-react";
import clsx from "clsx";

const menu = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Slider Beranda", href: "/admin/hero", icon: GalleryHorizontal },
  { label: "Layanan", href: "/admin/services", icon: Briefcase },
  { label: "Portofolio", href: "/admin/portfolio", icon: ImageIcon },
  { label: "Berita", href: "/admin/news", icon: Newspaper },
  { label: "Pesan Masuk", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-brand-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-brand-800">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo PTPN IV"
            className="w-9 h-9 object-contain bg-white rounded-md p-1"
          />
          <div>
            <p className="font-bold text-sm">PTPN IV</p>
            <p className="text-xs text-zinc-400">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-white text-zinc-900"
                  : "text-zinc-400 hover:bg-brand-800 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brand-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-brand-800 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Lihat Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-brand-800 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
