-- =====================================================
-- FIX: Pastikan kolom pasien_email ada di janji_temu
-- =====================================================

-- 1. Tambah kolom jika belum ada
ALTER TABLE janji_temu 
  ADD COLUMN IF NOT EXISTS pasien_email TEXT;

-- 2. Lihat data janji temu terbaru
SELECT janji_id, pasien_nama, pasien_email, layanan, tanggal, status
FROM janji_temu
ORDER BY created_at DESC
LIMIT 10;

-- 3. Update janji yang email-nya kosong berdasarkan nama ke tabel users
UPDATE janji_temu jt
SET pasien_email = u.email
FROM users u
WHERE jt.pasien_email IS NULL
  AND LOWER(jt.pasien_nama) = LOWER(u.full_name);

-- 4. Verify
SELECT janji_id, pasien_nama, pasien_email, layanan, status
FROM janji_temu
ORDER BY created_at DESC
LIMIT 10;
