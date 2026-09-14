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
              PT Perkebunan Nusantara IV pasca-aksi restrukturisasi atau yang sering disebut PalmCo adalah Subholding dari PT Perkebunan Nusantara III (Persero) dengan
              komoditas utama kelapa sawit dan dibentuk melalui penggabungan PTPN V, VI dan XIII ke dalam PTPN IV sebagai entitas yang bertahan, 
              serta pemisahan tidak murni PTPN III (Persero) ke dalam PTPN IV. Efektif bergabung pada 1 Desember 2023 sebagaimana tercantum dalam Akta Penggabungan Nomor 01 tanggal 1 Desember 2023 yang dibuat di hadapan Nanda Fauz Iwan, SH, M.Kn.,
              Notaris di Jakarta Selatan dan telah mendapat bukti penerimaan pemberitahuan penggabungan Perseroan berdasarkan Surat Menteri Hukum dan Hak Asasi Manusia Nomor AHU-AH.01.03-0149887 tanggal 1 Desember 2023 perihal Penerimaan Pemberitahuan 
              Penggabungan Perseroan PT Perkebunan Nusantara IV. Perubahan anggaran dasar Perseroan telah dinyatakan dalam Akta Nomor 02 tanggal 1 Desember 2023, yang dibuat di hadapan Nanda Fauz Iwan, SH, M.Kn., Notaris di Jakarta Selatan dan telah mendapat persetujuan dari 
              Menteri Hukum dan Hak Asasi Manusia berdasarkan Keputusan Nomor AHU-0074926.AH.01.02 Tahun 2023 tanggal 1 Desember 2023 tentang Persetujuan Perubahan Anggaran Dasar Perseroan Terbatas PT Perkebunan Nusantara IV dan pemberitahuannya telah diterima oleh Menteri Hukum 
              dan Hak Asasi Manusia berdasarkan Surat Nomor AHU-AH.01.03-0149887 tanggal 1 Desember 2023 perihal Penerimaan Pemberitahuan Perubahan Anggaran Dasar PT Perkebunan Nusantara IV. dan Akta Nomor 08 tanggal 1 Desember 2023 yang dibuat di hadapan Nanda Fauz Iwan, SH, M.Kn., 
              Notaris di Jakarta Selatan dan telah mendapat persetujuan dari Menteri Hukum dan Hak Asasi Manusia berdasarkan Keputusan Nomor AHU-0075166.AH.01.02.2023 tanggal 7 Desember 2023 tentang Persetujuan Perubahan Anggaran Dasar Perseroan Terbatas PT Perkebunan Nusantara IV. Decorative palm 1Decorative palm 1.
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
