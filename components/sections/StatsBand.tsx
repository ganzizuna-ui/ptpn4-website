import { Leaf, TrendingUp, Users2, Factory } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  { icon: Leaf, value: "30+", label: "Unit Usaha Perkebunan" },
  { icon: TrendingUp, value: "150K+", label: "Hektar Lahan Dikelola" },
  { icon: Users2, value: "20K+", label: "Karyawan & Mitra Petani" },
  { icon: Factory, value: "15+", label: "Pabrik Pengolahan Aktif" },
];

// Section ini sengaja dibuat dominan (background hijau tua penuh + pola
// daun dekoratif) supaya identitas PTPN IV sebagai BUMN perkebunan terasa
// kuat di tengah halaman, bukan cuma warna putih terus-menerus.
export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, white 0, transparent 45%), radial-gradient(circle at 85% 75%, white 0, transparent 40%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"
      />

      <div className="container-custom relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase">
            Skala Perusahaan
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dipercaya Mengelola Perkebunan Nasional
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-sm text-zinc-300">{stat.label}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}