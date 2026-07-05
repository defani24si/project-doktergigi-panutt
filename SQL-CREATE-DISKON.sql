-- =====================================================
-- TABEL DISKON & PROMO
-- =====================================================
-- Jalankan di SQL Editor Supabase

CREATE TABLE IF NOT EXISTS public.diskon (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  diskon INTEGER NOT NULL DEFAULT 0,
  min_beli NUMERIC(12,2) DEFAULT 0,
  berlaku_hingga DATE,
  status TEXT DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE diskon ENABLE ROW LEVEL SECURITY;

-- Policy allow all (development)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'diskon' AND policyname = 'diskon_all') THEN
    CREATE POLICY "diskon_all" ON diskon FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Data sample
INSERT INTO diskon (kode, nama, diskon, min_beli, berlaku_hingga, status) VALUES
('GIGI10', 'Diskon Scaling 10%', 10, 150000, '2026-08-31', 'Aktif'),
('NEWMEMBER', 'Member Baru 20%', 20, 0, '2026-07-31', 'Aktif'),
('LEBARAN25', 'Promo Lebaran 25%', 25, 200000, '2026-04-10', 'Tidak Aktif')
ON CONFLICT (kode) DO NOTHING;

-- Check
SELECT * FROM diskon ORDER BY created_at DESC;
