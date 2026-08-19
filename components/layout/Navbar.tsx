"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Layanan", href: "/#layanan" },
  { label: "Portofolio", href: "/#portofolio" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/#kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-zinc-200"
            : "bg-white border-b border-transparent"
        )}
      >
        <nav className="container-custom flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Logo PTPN IV"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-zinc-900 text-sm sm:text-base">
                PTPN IV
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-500">
                Regional Sumatera Utara
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-900 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              href="/#kontak"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-brand-900 text-white text-sm font-semibold hover:bg-brand-800 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-zinc-100 transition-colors"
            aria-label="Buka menu"
          >
            <Menu className="w-6 h-6 text-zinc-900" />
          </button>
        </nav>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-[60] lg:hidden transition-all duration-300",
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={clsx(
            "absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-xl transition-transform duration-300 flex flex-col",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-zinc-100">
            <span className="font-bold text-zinc-900">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-zinc-100"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5 text-zinc-900" />
            </button>
          </div>

          <ul className="flex flex-col p-5 gap-1 overflow-y-auto">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-zinc-700 font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto p-5 border-t border-zinc-100">
            <Link
              href="/#kontak"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-5 py-3 rounded-lg bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
