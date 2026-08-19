import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const footerLinks = {
  perusahaan: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Visi & Misi", href: "/tentang#visi-misi" },
    { label: "Tata Kelola", href: "/tentang#tata-kelola" },
    { label: "Karir", href: "/karir" },
  ],
  layanan: [
    { label: "Kelapa Sawit", href: "/#layanan" },
    { label: "Karet", href: "/#layanan" },
    { label: "Kemitraan Petani", href: "/#layanan" },
    { label: "Riset & Pengembangan", href: "/#layanan" },
  ],
  informasi: [
    { label: "Berita & Artikel", href: "/berita" },
    { label: "Portofolio Unit Usaha", href: "/#portofolio" },
    { label: "Hubungi Kami", href: "/#kontak" },
    { label: "Admin", href: "/admin" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-zinc-300">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Address */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Logo PTPN IV"
                className="w-10 h-10 object-contain bg-white rounded-md p-1"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white">PTPN IV</span>
                <span className="text-xs text-zinc-400">Regional Sumatera Utara</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-sm">
              PT Perkebunan Nusantara IV berkomitmen mengelola sumber daya
              perkebunan secara berkelanjutan untuk kesejahteraan bangsa.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-500" />
                <span>Jl. Sei Batang Hari No.2, Simpang Tj., Kec. Medan Sunggal, Kota Medan, Sumatera Utara, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-zinc-500" />
                <span>(061) 4534 XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-zinc-500" />
                <span>info@ptpn4.co.id</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Perusahaan</h4>
            <ul className="space-y-2.5">
              {footerLinks.perusahaan.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Layanan</h4>
            <ul className="space-y-2.5">
              {footerLinks.layanan.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Informasi</h4>
            <ul className="space-y-2.5">
              {footerLinks.informasi.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} PT Perkebunan Nusantara IV. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              
               <a key={i} href="#" aria-label="Media sosial" className="w-9 h-9 rounded-full bg-brand-800 flex items-center justify-center hover:bg-gold-500 transition-colors" >
                <Icon className="w-4 h-4 text-zinc-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Kredit Pembuat & Tujuan Website */}
        <div className="mt-6 pt-6 border-t border-brand-800/60 text-center">
          <p className="text-xs text-zinc-500 leading-relaxed">
            Website ini dikembangkan oleh{" "}
            <span className="text-gold-500 font-semibold">
              Muhammad Ibrahim, Akbar Nasution, Nazwa Aira, Nuraini
            </span>{" "}
            sebagai bentuk digitalisasi profil perusahaan PT Perkebunan
            Nusantara IV.
          </p>
        </div>
      </div>
    </footer>
  );
}