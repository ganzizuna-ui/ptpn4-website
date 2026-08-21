"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Membungkus konten supaya muncul dengan animasi fade + geser ke atas saat
 * pengunjung men-scroll dan elemen ini masuk ke layar (bukan langsung
 * tampil semua saat halaman dibuka). Dipakai di berbagai section supaya
 * website terasa lebih hidup / ada efek visual saat di-scroll.
 *
 * Cara pakai:
 *   <ScrollReveal><h2>Judul</h2></ScrollReveal>
 *   <ScrollReveal delay={150}><p>Teks lain, muncul sedikit belakangan</p></ScrollReveal>
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={clsx(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}