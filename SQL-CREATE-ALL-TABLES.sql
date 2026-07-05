-- =====================================================
-- BUAT SEMUA TABEL UNTUK PANUTT CLINIC
-- =====================================================
-- Copy-paste ke SQL Editor di Supabase Dashboard

-- 1. TABEL USERS (Sudah ada, skip jika sudah dibuat)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'guest')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL DOKTER
CREATE TABLE IF NOT EXISTS public.dokter (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dokter_id TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  spesialis TEXT NOT NULL,
  no_hp TEXT,
  email TEXT UNIQUE,
  jadwal TEXT,
  status TEXT DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL PASIEN
CREATE TABLE IF NOT EXISTS public.pasien (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pasien_id TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  umur INTEGER,
  tanggal_lahir DATE,
  jenis_kelamin TEXT CHECK (jenis_kelamin IN ('L', 'P')),
  no_hp TEXT,
  alamat TEXT,
  terakhir_kunjungan DATE,
  status TEXT DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif')),
  level_membership TEXT DEFAULT 'Regular' CHECK (level_membership IN ('Regular', 'Bronze', 'Silver', 'Gold', 'Platinum')),
  referral_code TEXT UNIQUE,
  jenis_perawatan TEXT,
  total_biaya NUMERIC(12,2) DEFAULT 0,
  metode_pembayaran TEXT,
  feedback TEXT,
  sumber TEXT,
  riwayat_kunjungan INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL JANJI TEMU (APPOINTMENTS)
CREATE TABLE IF NOT EXISTS public.janji_temu (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  janji_id TEXT UNIQUE NOT NULL,
  pasien_id UUID REFERENCES pasien(id) ON DELETE CASCADE,
  pasien_nama TEXT NOT NULL,
  dokter_nama TEXT NOT NULL,
  tanggal DATE NOT NULL,
  jam TIME NOT NULL,
  layanan TEXT NOT NULL,
  keluhan TEXT,
  status TEXT DEFAULT 'Menunggu' CHECK (status IN ('Menunggu', 'Selesai', 'Dibatalkan')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ENABLE RLS UNTUK SEMUA TABEL
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokter ENABLE ROW LEVEL SECURITY;
ALTER TABLE pasien ENABLE ROW LEVEL SECURITY;
ALTER TABLE janji_temu ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES (Allow All untuk development)
-- USERS
CREATE POLICY "users_all" ON users FOR ALL USING (true) WITH CHECK (true);

-- DOKTER
CREATE POLICY "dokter_all" ON dokter FOR ALL USING (true) WITH CHECK (true);

-- PASIEN
CREATE POLICY "pasien_all" ON pasien FOR ALL USING (true) WITH CHECK (true);

-- JANJI TEMU
CREATE POLICY "janji_temu_all" ON janji_temu FOR ALL USING (true) WITH CHECK (true);

-- 7. INSERT DATA SAMPLE
-- Users
INSERT INTO users (full_name, email, password, role) VALUES
('Admin Panutt', 'admin@panutt.com', 'admin123', 'admin'),
('Panut Member', 'panut@gmail.com', 'panut123', 'member'),
('Member Test', 'member@test.com', 'member123', 'member')
ON CONFLICT (email) DO NOTHING;

-- Dokter
INSERT INTO dokter (dokter_id, nama, spesialis, no_hp, email, jadwal, status) VALUES
('DK-001', 'drg. Fikri (Umum)', 'Umum', '081211112222', 'fikri@dentiva.id', 'Senin – Jumat, 08:00 – 16:00', 'Aktif'),
('DK-002', 'drg. Anisa (Periodonti)', 'Periodonti', '081322223333', 'anisa@dentiva.id', 'Selasa – Sabtu, 09:00 – 17:00', 'Aktif'),
('DK-003', 'drg. Budi (Ortodonti)', 'Ortodonti', '081433334444', 'budi@dentiva.id', 'Senin – Rabu, 10:00 – 16:00', 'Aktif'),
('DK-004', 'drg. Siti (Bedah Mulut)', 'Bedah Mulut', '081544445555', 'siti@dentiva.id', 'Kamis – Sabtu, 08:00 – 14:00', 'Aktif'),
('DK-005', 'drg. Andi (Konservasi Gigi)', 'Konservasi Gigi', '081655556666', 'andi@dentiva.id', 'Senin – Jumat, 13:00 – 20:00', 'Aktif')
ON CONFLICT (dokter_id) DO NOTHING;

-- Pasien
INSERT INTO pasien (pasien_id, nama, umur, tanggal_lahir, jenis_kelamin, no_hp, alamat, terakhir_kunjungan, status, level_membership, referral_code, jenis_perawatan, total_biaya, metode_pembayaran, feedback, sumber, riwayat_kunjungan) VALUES
('PT0001', 'Fajar Santoso', 34, '1991-12-16', 'L', '085502258532', 'Bangkinang', '2022-10-27', 'Tidak Aktif', 'Platinum', 'DEN2435', 'Pemasangan Crown', 4867071, 'Cash', 'Pelayanan ramah', 'TikTok', 3),
('PT0002', 'Fajar Nugroho', 34, '1991-11-26', 'L', '087398950686', 'Bangkinang', '2024-11-03', 'Tidak Aktif', 'Platinum', 'DEN7136', 'Konsultasi Gigi', 4526087, 'Cash', 'Klinik bersih', 'WhatsApp', 6),
('PT0003', 'Ayu Hidayat', 11, '2014-12-06', 'P', '080536880473', 'Siak', '2023-12-24', 'Tidak Aktif', 'Silver', 'DEN3519', 'Tambal Gigi', 3199387, 'QRIS', 'Dokter sangat membantu', 'Referral', 13),
('PT0004', 'Tiara Lestari', 17, '2008-06-13', 'P', '085116086186', 'Bangkinang', '2024-05-11', 'Aktif', 'Gold', 'DEN5301', 'Tambal Gigi', 4430876, 'E-wallet', 'Klinik bersih', 'Instagram', 2),
('PT0005', 'Agus Rahma', 9, '2016-12-29', 'L', '084246528581', 'Pekanbaru', '2025-11-04', 'Aktif', 'Platinum', 'DEN8080', 'Pemutihan Gigi', 4659181, 'QRIS', 'Klinik bersih', 'Website', 5)
ON CONFLICT (pasien_id) DO NOTHING;

-- Janji Temu
INSERT INTO janji_temu (janji_id, pasien_nama, dokter_nama, tanggal, jam, layanan, keluhan, status) VALUES
('JT-001', 'Andi Pratama', 'drg. Fikri (Umum)', CURRENT_DATE, '10:00', 'Scaling Gigi', 'Gigi terasa kasar dan gusi berdarah saat sikat gigi.', 'Menunggu'),
('JT-002', 'Siti Rahayu', 'drg. Andi (Konservasi Gigi)', CURRENT_DATE, '11:00', 'Tambal Komposit', 'Gigi geraham belakang berlubang.', 'Selesai'),
('JT-003', 'Bapak Wijaya', 'drg. Siti (Bedah Mulut)', CURRENT_DATE + INTERVAL '2 days', '14:00', 'Odontektomi', 'Gigi bungsu sakit.', 'Menunggu')
ON CONFLICT (janji_id) DO NOTHING;

-- 8. CREATE INDEXES
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_dokter_dokter_id ON dokter(dokter_id);
CREATE INDEX IF NOT EXISTS idx_pasien_pasien_id ON pasien(pasien_id);
CREATE INDEX IF NOT EXISTS idx_janji_temu_janji_id ON janji_temu(janji_id);
CREATE INDEX IF NOT EXISTS idx_janji_temu_tanggal ON janji_temu(tanggal);
