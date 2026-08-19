# Website Company Profile PTPN IV Medan

Website company profile dinamis dibangun dengan **Next.js 14 (App Router)**,
**TypeScript**, **Tailwind CSS**, dan **Lucide React**, lengkap dengan
**panel admin** untuk mengelola konten (Layanan, Portofolio, Berita, dan
Pesan Kontak) tanpa perlu mengubah kode.

---

## 🚀 Langkah Menjalankan Project

### 1. Install dependencies
```bash
npm install
```

### 2. Buat file environment
Salin `.env.local.example` menjadi `.env.local`:
```bash
cp .env.local.example .env.local
```
Lalu ubah `ADMIN_USERNAME` dan `ADMIN_PASSWORD` sesuai keinginan Anda.

### 3. Jalankan development server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Akses Panel Admin
Buka [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Login default** (jika `.env.local` belum diubah):
- Username: `admin`
- Password: `ptpn4admin123`

> ⚠️ **PENTING:** Wajib ganti username & password default sebelum website
> dipakai secara publik/production.

### 5. Build untuk production
```bash
npm run build
npm start
```

---

## 📂 Struktur Folder Lengkap

```
ptpn4-website/
├── app/
│   ├── layout.tsx                     # Root layout (html/body, tanpa navbar)
│   ├── globals.css                    # Style global + Tailwind
│   │
│   ├── (marketing)/                   # Route group: halaman publik (pakai Navbar+Footer)
│   │   ├── layout.tsx                 # Layout publik (Navbar + Footer)
│   │   ├── page.tsx                   # Homepage (/)
│   │   ├── tentang/page.tsx           # Halaman /tentang
│   │   ├── berita/page.tsx            # Halaman /berita (list)
│   │   ├── berita/[slug]/page.tsx     # Halaman /berita/judul-slug (detail)
│   │   └── not-found.tsx              # Halaman 404 custom
│   │
│   ├── admin/                         # Halaman admin (dilindungi middleware)
│   │   ├── login/page.tsx             # /admin/login
│   │   ├── page.tsx                   # /admin (dashboard)
│   │   ├── services/page.tsx          # /admin/services (CRUD Layanan)
│   │   ├── portfolio/page.tsx         # /admin/portfolio (CRUD Portofolio)
│   │   ├── news/page.tsx              # /admin/news (CRUD Berita)
│   │   └── messages/page.tsx          # /admin/messages (Pesan Masuk)
│   │
│   └── api/                           # API Routes (backend)
│       ├── services/route.ts          # GET, POST /api/services
│       ├── services/[id]/route.ts     # PUT, DELETE /api/services/:id
│       ├── portfolio/route.ts         # GET, POST /api/portfolio
│       ├── portfolio/[id]/route.ts    # PUT, DELETE /api/portfolio/:id
│       ├── news/route.ts              # GET, POST /api/news
│       ├── news/[id]/route.ts         # PUT, DELETE /api/news/:id
│       ├── contact/route.ts           # GET, POST /api/contact
│       ├── contact/[id]/route.ts      # PUT, DELETE /api/contact/:id
│       └── auth/
│           ├── login/route.ts         # POST /api/auth/login
│           └── logout/route.ts        # POST /api/auth/logout
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                 # Header sticky + mobile drawer
│   │   └── Footer.tsx                 # Footer + social links
│   ├── sections/
│   │   ├── Hero.tsx                   # Hero section homepage
│   │   ├── Services.tsx               # Grid layanan (server component, baca JSON)
│   │   ├── Portfolio.tsx              # Grid portofolio/proyek
│   │   └── Contact.tsx                # Form kontak fungsional (client component)
│   └── admin/
│       ├── AdminSidebar.tsx           # Sidebar navigasi admin
│       ├── AdminShell.tsx             # Wrapper layout halaman admin
│       └── Modal.tsx                  # Modal reusable untuk form CRUD
│
├── lib/
│   ├── db.ts                          # Helper baca/tulis data JSON
│   ├── types.ts                       # TypeScript interfaces
│   ├── auth.ts                        # Login/logout/cek sesi admin
│   └── icon-map.tsx                   # Mapping nama icon (string) -> komponen Lucide
│
├── data/                              # "Database" berbasis file JSON
│   ├── services.json
│   ├── portfolio.json
│   ├── news.json
│   └── messages.json
│
├── middleware.ts                      # Proteksi semua route /admin/*
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── .env.local.example
```

---

## 🎨 Tema Desain

| Elemen | Warna |
|---|---|
| Background utama | White / Off-white (`bg-white`, `bg-zinc-50`) |
| Teks & border | Slate/Zinc Gray (`text-zinc-600`, `border-zinc-200`) |
| Aksen/CTA | Dark Charcoal (`bg-zinc-900`) |

Semua warna sudah didefinisikan lewat utility class Tailwind sehingga mudah
disesuaikan lagi lewat `tailwind.config.ts`.

---

## ⚙️ Cara Kerja Sistem Admin (CMS Sederhana)

Karena ini company profile skala menengah, penyimpanan data memakai
**file JSON** di folder `/data` (bukan database eksternal) supaya:
- Tidak perlu setup database tambahan.
- Mudah dijalankan langsung di local/hosting sederhana (VPS/Node server).

Alur kerja:
1. Halaman publik (Services, Portfolio, Berita) **membaca** file JSON via
   Server Component (`lib/db.ts` → `readData()`).
2. Halaman admin **menulis/mengubah** file JSON via API Routes
   (`app/api/.../route.ts` → `writeData()`).
3. Setiap perubahan di admin akan langsung terlihat di halaman publik
   (karena Next.js akan re-render saat request baru masuk).

### ⚠️ Catatan penting untuk PRODUCTION
Penyimpanan berbasis file JSON **tidak cocok** untuk:
- Hosting *serverless* (Vercel, Netlify) — karena filesystem bersifat
  read-only/temporary di sana.
- Trafik tinggi dengan banyak admin mengedit bersamaan.

**Rekomendasi upgrade untuk production:**
- Ganti `lib/db.ts` dengan koneksi database sungguhan, misalnya
  **PostgreSQL + Prisma ORM**, atau **Supabase**.
- Ganti sistem auth sederhana (`lib/auth.ts`) dengan **NextAuth.js** dan
  hash password (bcrypt) + tabel user di database.
- Untuk upload gambar, integrasikan layanan seperti **Cloudinary** atau
  **AWS S3**, karena saat ini form admin hanya menerima **URL gambar**
  (paste link), belum ada upload file langsung.
- Untuk email notifikasi form kontak, integrasikan **Resend** atau
  **Nodemailer** di `app/api/contact/route.ts`.

Jika Anda memakai hosting VPS/Node biasa (bukan serverless), sistem file
JSON ini **tetap bisa dipakai dengan aman** untuk skala company profile.

---

## 🧩 Yang Perlu Anda Lakukan Sekarang

1. **Jalankan `npm install`** lalu `npm run dev`.
2. **Cek semua halaman publik**: Beranda, Tentang, Berita, dan scroll ke
   Layanan/Portofolio/Kontak di homepage.
3. **Login ke `/admin/login`** dan coba tambah/ubah/hapus data Layanan,
   Portofolio, dan Berita — lihat hasilnya langsung di halaman publik.
4. **Ganti konten dummy** (alamat, nomor telepon, email, deskripsi
   perusahaan) sesuai data resmi PTPN IV — bisa langsung edit di
   `components/layout/Footer.tsx`, `components/sections/Contact.tsx`, dan
   `app/(marketing)/tentang/page.tsx`.
5. **Ganti gambar placeholder** (saat ini pakai Unsplash) dengan foto asli
   unit kebun/pabrik PTPN IV lewat panel admin (isi kolom URL Gambar) atau
   upload manual ke folder `public/uploads` lalu isi path-nya, misal
   `/uploads/nama-file.jpg`.
6. **Ganti kredensial admin default** di file `.env.local` sebelum deploy.
7. **(Opsional, untuk production)** Upgrade ke database sungguhan sesuai
   catatan di atas jika akan deploy ke Vercel/Netlify atau trafik tinggi.

Selamat mencoba! 🌱
