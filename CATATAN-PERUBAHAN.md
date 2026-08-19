# Catatan Perubahan Terbaru — Siap untuk Hosting Gratis

## Apa yang berubah?
Sebelumnya data (layanan, portofolio, berita, pesan masuk, slider) dan gambar
upload disimpan di file lokal (`data/*.json`, `public/uploads`). Ini TIDAK
akan bekerja dengan baik di hosting gratis seperti Vercel, karena server di
sana bersifat sementara — tulisan ke file lokal bisa hilang.

Sekarang semua data & gambar dipindah ke **Supabase** (database + storage,
gratis), supaya:
- Perubahan yang Anda buat di admin **langsung tampil ke semua pengunjung**,
  kapan pun mereka buka web-nya — tanpa perlu deploy ulang.
- Pesan yang dikirim pengunjung lewat form kontak **langsung tersimpan
  permanen** dan muncul di dashboard admin (`/admin` dan `/admin/messages`).
- Upload gambar (logo, slider, portofolio, berita) tetap ada meskipun server
  di-restart / deploy ulang.

## Yang perlu Anda lakukan sebelum deploy — 4 langkah

### 1. Buat project Supabase (gratis)
1. Buka https://supabase.com → Sign up / login (bisa pakai akun Google/GitHub).
2. Klik **New Project**. Isi nama bebas, pilih password database (simpan
   baik-baik), pilih region terdekat (mis. Singapore).
3. Tunggu ~2 menit sampai project selesai dibuat.

### 2. Buat tabel & bucket gambar
1. Di sidebar project, klik **SQL Editor** → **New query**.
2. Buka file `supabase/schema.sql` dari project ini, salin semua isinya,
   tempel ke SQL Editor, lalu klik **Run**.
3. Ini otomatis membuat semua tabel (hero, services, portfolio, news,
   messages) berikut data awal, dan membuat bucket penyimpanan gambar
   bernama `uploads`.

### 3. Ambil kunci API Supabase
1. Di sidebar, klik **Project Settings** (ikon gear) → **API**.
2. Salin nilai **Project URL** dan **service_role key** (bagian "Project API
   keys" — klik "Reveal" untuk melihatnya, JANGAN yang "anon public").

### 4. Isi environment variables
Buat file `.env.local` (salin dari `.env.local.example`), lalu isi:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ganti-dengan-password-anda-sendiri
SESSION_SECRET=ganti-dengan-string-acak-panjang
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=isi-dari-langkah-3
```

Coba jalankan lokal dulu untuk memastikan semua tersambung:
```
npm install
npm run dev
```
Buka `localhost:3000` — data (layanan, portofolio, berita, slider) harus
tetap tampil seperti biasa (sekarang datanya dari Supabase, bukan file lokal).

## Deploy gratis ke Vercel
1. Upload/push folder project ini ke GitHub (buat repo baru, gratis).
2. Buka https://vercel.com → Sign up pakai akun GitHub.
3. Klik **Add New → Project**, pilih repo GitHub Anda tadi.
4. Sebelum klik Deploy, buka bagian **Environment Variables**, lalu isi
   4 variabel yang sama seperti di `.env.local` (ADMIN_USERNAME,
   ADMIN_PASSWORD, SESSION_SECRET, NEXT_PUBLIC_SUPABASE_URL,
   SUPABASE_SERVICE_ROLE_KEY).
5. Klik **Deploy**. Tunggu 1-2 menit → website Anda online gratis di alamat
   seperti `nama-project.vercel.app`.

Setelah itu, kapan pun Anda push perubahan kode ke GitHub, Vercel otomatis
deploy ulang. Dan perubahan yang Anda lakukan lewat panel admin (`/admin`)
langsung tampil ke pengunjung tanpa perlu deploy ulang sama sekali, karena
datanya sekarang di database Supabase, bukan di file.

## Ringkasan fitur admin
- **Slider Beranda** (`/admin/hero`) — upload/ubah/hapus/urutkan gambar slider.
- **Layanan, Portofolio, Berita** — kelola konten seperti biasa.
- **Pesan Masuk** (`/admin/messages`) — semua pesan dari form kontak
  pengunjung otomatis muncul di sini, tersimpan permanen.
