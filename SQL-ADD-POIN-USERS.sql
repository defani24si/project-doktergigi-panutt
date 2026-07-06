-- =====================================================
-- TAMBAH KOLOM POIN & TIER KE TABEL USERS
-- =====================================================
-- Jalankan di SQL Editor Supabase

-- Tambah kolom jika belum ada
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS total_poin INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS membership_tier TEXT DEFAULT 'Bronze' 
    CHECK (membership_tier IN ('Bronze', 'Silver', 'Gold', 'Platinum'));

-- Set nilai awal untuk user yang sudah ada
UPDATE users SET total_poin = 0 WHERE total_poin IS NULL;
UPDATE users SET membership_tier = 'Bronze' WHERE membership_tier IS NULL;

-- Tambah kolom poin_per_kunjungan ke janji_temu (mencatat poin yang sudah diberikan)
ALTER TABLE janji_temu
  ADD COLUMN IF NOT EXISTS poin_diberikan BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS pasien_email TEXT;

-- Function: hitung tier berdasarkan poin
CREATE OR REPLACE FUNCTION hitung_tier(poin INTEGER)
RETURNS TEXT AS $$
BEGIN
  IF poin >= 2000 THEN RETURN 'Platinum';
  ELSIF poin >= 1000 THEN RETURN 'Gold';
  ELSIF poin >= 500 THEN RETURN 'Silver';
  ELSE RETURN 'Bronze';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Check hasilnya
SELECT id, full_name, email, role, total_poin, membership_tier FROM users;
