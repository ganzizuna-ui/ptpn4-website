import type { Metadata } from "next";
import { Target, Eye, ShieldCheck, Handshake, Leaf, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami | PTPN IV Medan",
  description: "Profil, visi, misi, dan tata kelola PT Perkebunan Nusantara IV.",
};

const values = [
  { icon: ShieldCheck, title: "Integritas", desc: "Menjunjung tinggi kejujuran dan etika bisnis dalam setiap aktivitas." },
  { icon: Handshake, title: "Kolaborasi", desc: "Membangun kemitraan yang saling menguntungkan dengan seluruh pemangku kepentingan." },
  { icon: Leaf, title: "Berkelanjutan", desc: "Berkomitmen pada praktik bisnis yang ramah lingkungan dan bertanggung jawab." },
  { icon: Award, title: "Unggul", desc: "Selalu berupaya memberikan hasil dan pelayanan terbaik secara konsisten." },
];

export default function TentangPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-900 py-20 sm:py-28">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Tentang PTPN IV
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Mengenal lebih dekat sejarah, visi, misi, dan nilai-nilai yang
            menjadi fondasi PT Perkebunan Nusantara IV.
          </p>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-16 sm:py-24">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              Sejarah Perusahaan
            </span>
            <h2 className="mt-3 text-3xl font-bold text-zinc-900 tracking-tight">
              Perjalanan Panjang Membangun Perkebunan Nusantara
            </h2>
            <p className="mt-6 text-zinc-600 leading-relaxed">
              PT Perkebunan Nusantara IV merupakan salah satu perusahaan
              perkebunan milik negara terbesar di Indonesia yang bergerak
              dalam bidang usaha kelapa sawit dan karet. Berlokasi strategis
              di wilayah Sumatera Utara, perusahaan telah beroperasi selama
              puluhan tahun dan terus bertransformasi menjadi perusahaan
              agribisnis modern yang berkelanjutan.
            </p>
            <p className="mt-4 text-zinc-600 leading-relaxed">
              Dengan puluhan unit usaha yang tersebar di berbagai kabupaten,
              perusahaan berkomitmen memberikan kontribusi nyata bagi
              perekonomian daerah dan kesejahteraan masyarakat sekitar
              wilayah operasional.
            </p>
          </div>
          <div className="aspect-video rounded-2xl bg-brand-900 flex items-center justify-center">
            <Leaf className="w-20 h-20 text-white/10" strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section id="visi-misi" className="py-16 sm:py-24 bg-zinc-50">
        <div className="container-custom grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-white border border-zinc-200">
            <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Visi</h3>
            <p className="text-zinc-600 leading-relaxed">
              Menjadi perusahaan agribisnis perkebunan terdepan dan
              berkelanjutan yang berdaya saing global.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-zinc-200">
            <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Misi</h3>
            <ul className="text-zinc-600 leading-relaxed space-y-2 list-disc list-inside">
              <li>Mengelola perkebunan secara efisien dan berkelanjutan</li>
              <li>Meningkatkan kesejahteraan karyawan dan masyarakat sekitar</li>
              <li>Menerapkan tata kelola perusahaan yang baik (GCG)</li>
              <li>Berinovasi dalam teknologi dan riset perkebunan</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai */}
      <section id="tata-kelola" className="py-16 sm:py-24">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              Nilai Perusahaan
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
              Prinsip yang Kami Junjung
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-2xl border border-zinc-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-zinc-700" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
