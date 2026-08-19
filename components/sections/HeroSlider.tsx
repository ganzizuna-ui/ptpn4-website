"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import clsx from "clsx";

export type HeroSlide = {
  /** Path to the image, e.g. "/uploads/hero/kebun-sawit.jpg". Leave empty to show a placeholder. */
  image?: string;
  caption: string;
};

// Dipakai hanya jika data dari /api/hero belum ada/gagal dimuat.
const fallbackSlides: HeroSlide[] = [
  { image: "", caption: "Perkebunan Kelapa Sawit" },
  { image: "", caption: "Produksi CPO Berkualitas" },
  { image: "", caption: "Kemitraan Petani Plasma" },
];

export default function HeroSlider({ autoPlayMs = 5000 }: { autoPlayMs?: number }) {
  const [slides, setSlides] = useState<HeroSlide[]>(fallbackSlides);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; dragging: boolean }>({
    startX: 0,
    dragging: false,
  });

  // Ambil gambar slider dari admin (data/hero.json lewat API), agar begitu
  // admin mengubah gambar di panel admin, tampilan di beranda ikut berubah.
  useEffect(() => {
    let active = true;
    fetch("/api/hero")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: HeroSlide[]) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(() => {
        // Biarkan fallbackSlides yang tampil kalau API gagal dimuat.
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [slides.length, index]);

  const goTo = useCallback(
    (i: number) => {
      const next = (i + slides.length) % slides.length;
      setIndex(next);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (!autoPlayMs || slides.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(t);
  }, [autoPlayMs, slides.length]);

  // Drag / swipe handlers
  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, dragging: true };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.startX;
    dragState.current.dragging = false;
    const threshold = 40;
    if (delta > threshold) prev();
    else if (delta < -threshold) next();
  };

  return (
    <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
      <div
        className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl bg-brand-900 overflow-hidden select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Slide track */}
        <div
          ref={trackRef}
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="relative w-full h-full flex-shrink-0">
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={slide.caption}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-950" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="w-24 h-24 text-white/10" strokeWidth={1} />
                  </div>
                </>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-12">
                <p className="text-white font-semibold text-sm">{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-brand-900" />
        </button>
        <button
          onClick={next}
          aria-label="Berikutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-brand-900" />
        </button>

        {/* Dots */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ke slide ${i + 1}`}
              className={clsx(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
