-- ==========================================================================
-- Jalankan seluruh file ini di: Supabase Dashboard > SQL Editor > New Query
-- Lalu klik "Run". Ini akan membuat semua tabel yang dipakai website, plus
-- mengisi data awal (sama seperti isi folder /data sebelumnya).
-- ==========================================================================

-- Kolom "position" dipakai untuk menjaga urutan tampil data (menggantikan
-- urutan array di file JSON yang lama).

create table if not exists hero (
  id text primary key,
  image text not null,
  caption text,
  position integer not null default 0
);

create table if not exists services (
  id text primary key,
  icon text,
  title text not null,
  description text,
  position integer not null default 0
);

create table if not exists portfolio (
  id text primary key,
  title text not null,
  category text,
  location text,
  image text,
  position integer not null default 0
);

create table if not exists news (
  id text primary key,
  slug text unique,
  title text not null,
  excerpt text,
  content text,
  image text,
  date text,
  author text,
  position integer not null default 0
);

create table if not exists messages (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  "createdAt" text,
  "read" boolean not null default false,
  position integer not null default 0
);

-- ------------------------------ SEED DATA --------------------------------

insert into hero (id, image, caption, position) values
  ('hero1', '/uploads/hero/hero-1-kebun-sawit.jpg', 'Perkebunan Kelapa Sawit', 0),
  ('hero2', '/uploads/hero/hero-2-kebun-teh.jpg', 'Perkebunan Teh', 1),
  ('hero3', '/uploads/hero/hero-3-pabrik-malam.jpg', 'Fasilitas Pengolahan', 2),
  ('hero4', '/uploads/hero/hero-4-panen-kopi.jpg', 'Panen Kopi', 3)
on conflict (id) do nothing;

insert into services (id, icon, title, description, position) values
  ('1', 'Leaf', 'Kelapa Sawit', 'Pengelolaan perkebunan kelapa sawit berkelanjutan dengan standar RSPO & ISPO untuk hasil CPO berkualitas tinggi.', 0),
  ('2', 'TreePine', 'Karet', 'Budidaya dan pengolahan karet alam dengan teknologi modern untuk memenuhi kebutuhan industri nasional dan ekspor.', 1),
  ('3', 'Factory', 'Pabrik Pengolahan', 'Fasilitas pabrik kelapa sawit (PKS) dan pabrik karet remah dengan kapasitas produksi besar dan efisien.', 2),
  ('4', 'Users', 'Kemitraan Petani', 'Program kemitraan inti-plasma yang memberdayakan petani sekitar wilayah operasional perusahaan.', 3),
  ('5', 'Leaf', 'Riset & Pengembangan', 'Inovasi bibit unggul dan teknologi budidaya untuk meningkatkan produktivitas lahan secara berkelanjutan.', 4),
  ('6', 'Globe2', 'Ekspor & Distribusi', 'Jaringan distribusi dan ekspor hasil perkebunan ke berbagai negara mitra dagang di seluruh dunia.', 5)
on conflict (id) do nothing;

insert into portfolio (id, title, category, location, image, position) values
  ('1', 'Unit Kebun Bah Jambi', 'Kelapa Sawit', 'Simalungun, Sumatera Utara', 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80', 0),
  ('2', 'PKS Adolina', 'Pabrik Pengolahan', 'Serdang Bedagai, Sumatera Utara', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', 1),
  ('3', 'Unit Kebun Balimbingan', 'Kelapa Sawit', 'Simalungun, Sumatera Utara', 'https://images.unsplash.com/photo-1591086722183-e0b8d6a90c30?w=800&q=80', 2),
  ('4', 'Program Plasma Petani', 'Kemitraan', 'Sumatera Utara', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80', 3),
  ('5', 'Unit Kebun Marjandi', 'Karet', 'Simalungun, Sumatera Utara', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80', 4),
  ('6', 'Pabrik Karet Remah', 'Pabrik Pengolahan', 'Sumatera Utara', 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80', 5)
on conflict (id) do nothing;

insert into news (id, slug, title, excerpt, content, image, date, author, position) values
  ('1', 'ptpn-iv-raih-penghargaan-bumn', 'PTPN IV Raih Penghargaan BUMN Terbaik 2026',
   'PT Perkebunan Nusantara IV kembali menorehkan prestasi dengan meraih penghargaan sebagai salah satu BUMN dengan kinerja terbaik tahun ini.',
   'PT Perkebunan Nusantara IV kembali menorehkan prestasi dengan meraih penghargaan sebagai salah satu BUMN dengan kinerja terbaik tahun ini. Penghargaan ini diberikan atas capaian kinerja operasional, keuangan, serta komitmen perusahaan terhadap keberlanjutan lingkungan dan pemberdayaan masyarakat sekitar wilayah kerja perusahaan.',
   'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', '2026-07-15', 'Humas PTPN IV', 0),
  ('2', 'program-plasma-petani-diperluas', 'Program Kemitraan Plasma Petani Diperluas ke 5 Kabupaten',
   'Sebagai bentuk komitmen pemberdayaan masyarakat, PTPN IV memperluas cakupan program kemitraan plasma petani.',
   'Sebagai bentuk komitmen pemberdayaan masyarakat, PTPN IV memperluas cakupan program kemitraan plasma petani ke lima kabupaten baru di wilayah Sumatera Utara. Program ini diharapkan dapat meningkatkan kesejahteraan petani sekitar serta memperkuat rantai pasok kelapa sawit berkelanjutan.',
   'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', '2026-06-20', 'Humas PTPN IV', 1),
  ('3', 'ptpn-iv-terapkan-teknologi-digital-farming', 'PTPN IV Terapkan Teknologi Digital Farming di Unit Kebun',
   'Inovasi digital farming mulai diterapkan untuk meningkatkan efisiensi dan produktivitas lahan perkebunan.',
   'Inovasi digital farming mulai diterapkan di sejumlah unit kebun PTPN IV untuk meningkatkan efisiensi dan produktivitas lahan perkebunan. Teknologi ini mencakup pemantauan lahan berbasis sensor, drone monitoring, serta sistem manajemen data terintegrasi.',
   'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80', '2026-05-10', 'Humas PTPN IV', 2)
on conflict (id) do nothing;

-- Tabel "messages" sengaja TIDAK diisi data awal — akan terisi otomatis
-- setiap kali ada pengunjung mengirim pesan lewat form kontak di website.

-- ------------------------- STORAGE BUCKET GAMBAR --------------------------
-- Membuat bucket "uploads" untuk menyimpan gambar yang di-upload lewat admin
-- (logo, foto slider, dsb), dan membuatnya bisa dibaca publik (agar gambar
-- bisa tampil di website), sementara upload/hapus tetap hanya lewat server
-- (service role key), bukan langsung dari browser pengunjung.

insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

drop policy if exists "Public read access for uploads" on storage.objects;
create policy "Public read access for uploads"
on storage.objects for select
using (bucket_id = 'uploads');
