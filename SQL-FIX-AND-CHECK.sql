-- =====================================================
-- SQL FIX: Skip jika sudah ada, hanya insert data
-- =====================================================

-- 1. HAPUS POLICY YANG SUDAH ADA (optional, jika mau reset)
-- Uncomment jika mau hapus dan buat ulang
-- DROP POLICY IF EXISTS "users_all" ON users;
-- DROP POLICY IF EXISTS "dokter_all" ON dokter;
-- DROP POLICY IF EXISTS "pasien_all" ON pasien;
-- DROP POLICY IF EXISTS "janji_temu_all" ON janji_temu;

-- 2. BUAT POLICY HANYA JIKA BELUM ADA
DO $$ 
BEGIN
    -- Policy untuk users
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'users_all') THEN
        CREATE POLICY "users_all" ON users FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- Policy untuk dokter
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'dokter' AND policyname = 'dokter_all') THEN
        CREATE POLICY "dokter_all" ON dokter FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- Policy untuk pasien
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pasien' AND policyname = 'pasien_all') THEN
        CREATE POLICY "pasien_all" ON pasien FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- Policy untuk janji_temu
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'janji_temu' AND policyname = 'janji_temu_all') THEN
        CREATE POLICY "janji_temu_all" ON janji_temu FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;

-- 3. INSERT DATA SAMPLE (ON CONFLICT DO NOTHING = skip jika sudah ada)
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

-- Pasien (hanya 5 sample)
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

-- =====================================================
-- CHECK: Lihat semua data
-- =====================================================

-- Check Users
SELECT 'USERS' as table_name, COUNT(*) as total FROM users;
SELECT * FROM users ORDER BY created_at DESC;

-- Check Dokter
SELECT 'DOKTER' as table_name, COUNT(*) as total FROM dokter;
SELECT * FROM dokter ORDER BY created_at DESC;

-- Check Pasien
SELECT 'PASIEN' as table_name, COUNT(*) as total FROM pasien;
SELECT * FROM pasien ORDER BY created_at DESC LIMIT 5;

-- Check Janji Temu
SELECT 'JANJI_TEMU' as table_name, COUNT(*) as total FROM janji_temu;
SELECT * FROM janji_temu ORDER BY tanggal DESC;

-- =====================================================
-- VERIFY: Check apakah admin user ada
-- =====================================================
SELECT 
  full_name, 
  email, 
  role, 
  created_at 
FROM users 
WHERE role = 'admin';

-- Jika belum ada admin, uncomment dan jalankan:
-- UPDATE users SET role = 'admin' WHERE email = 'admin@panutt.com';
