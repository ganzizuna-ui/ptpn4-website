"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, XCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan, coba lagi.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan.");
    }
  }

  return (
    <section id="kontak" className="py-16 sm:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            Kontak
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
            Hubungi Kami
          </h2>
          <p className="mt-4 text-zinc-600">
            Ada pertanyaan atau ingin bekerja sama? Kirimkan pesan Anda,
            tim kami akan segera merespons.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex gap-4 p-5 rounded-2xl border border-zinc-200">
              <div className="w-11 h-11 rounded-xl bg-brand-900 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 mb-1">Alamat Kantor Pusat</h4>
                <p className="text-sm text-zinc-600">
                  Jl. Sei Batang Hari No.2, Simpang Tj., Kec. Medan Sunggal, Kota Medan, Sumatera Utara, Indonesia
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl border border-zinc-200">
              <div className="w-11 h-11 rounded-xl bg-brand-900 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 mb-1">Telepon</h4>
                <p className="text-sm text-zinc-600">(061) 4534 XXX</p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl border border-zinc-200">
              <div className="w-11 h-11 rounded-xl bg-brand-900 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 mb-1">Email</h4>
                <p className="text-sm text-zinc-600">info@ptpn4.co.id</p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl border border-zinc-200">
              <div className="w-11 h-11 rounded-xl bg-brand-900 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 mb-1">Jam Operasional</h4>
                <p className="text-sm text-zinc-600">Senin - Jumat, 08.00 - 17.00 WIB</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    No. Telepon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Subjek
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Topik pesan"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 outline-none transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
                {status !== "loading" && <Send className="w-4 h-4" />}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  Pesan Anda berhasil dikirim. Terima kasih!
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
