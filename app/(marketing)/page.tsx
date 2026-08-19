import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";

// Pastikan halaman selalu ambil data terbaru dari database (bukan versi
// statis yang di-cache saat build), supaya perubahan dari admin langsung
// terlihat pengunjung tanpa perlu deploy ulang.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </>
  );
}
