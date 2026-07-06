-- =====================================================
-- FIX: Set nilai default untuk user yang sudah ada
-- Kolom total_poin dan membership_tier mungkin NULL
-- =====================================================
-- Jalankan di SQL Editor Supabase

-- 1. Pastikan kolom sudah ada
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS total_poin INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS membership_tier TEXT DEFAULT 'Bronze';

-- 2. Set nilai default untuk user yang poin/tiernya NULL
UPDATE users 
SET 
  total_poin = 0,
  membership_tier = 'Bronze'
WHERE 
  total_poin IS NULL 
  OR membership_tier IS NULL;

-- 3. Set NOT NULL dengan default (opsional, agar ke depannya tidak bisa NULL)
ALTER TABLE users 
  ALTER COLUMN total_poin SET DEFAULT 0,
  ALTER COLUMN membership_tier SET DEFAULT 'Bronze';

-- 4. Verify
SELECT id, full_name, email, role, total_poin, membership_tier 
FROM users 
ORDER BY created_at DESC;
