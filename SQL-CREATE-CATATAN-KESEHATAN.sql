-- =====================================================
-- TABEL CATATAN KESEHATAN
-- =====================================================
-- Jalankan di SQL Editor Supabase

CREATE TABLE IF NOT EXISTS public.catatan_kesehatan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pasien_nama TEXT NOT NULL,
  pasien_email TEXT,
  tanggal DATE NOT NULL,
  tindakan TEXT NOT NULL,
  dokter TEXT,
  diagnosis TEXT,
  resep TEXT,
  biaya NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'Selesai' CHECK (status IN ('Selesai', 'Dalam Perawatan', 'Perlu Kontrol')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_catatan_pasien_nama ON catatan_kesehatan(pasien_nama);
CREATE INDEX IF NOT EXISTS idx_catatan_pasien_email ON catatan_kesehatan(pasien_email);
CREATE INDEX IF NOT EXISTS idx_catatan_tanggal ON catatan_kesehatan(tanggal);

-- RLS
ALTER TABLE catatan_kesehatan ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'catatan_kesehatan' AND policyname = 'catatan_all') THEN
    CREATE POLICY "catatan_all" ON catatan_kesehatan FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Data sample
INSERT INTO catatan_kesehatan (pasien_nama, pasien_email, tanggal, tindakan, dokter, diagnosis, resep, biaya, status) VALUES
('Panut Member', 'panut@gmail.com', '2025-01-20', 'Scaling & Pembersihan Karang Gigi', 'drg. Fikri (Umum)', 'Plak dan karang gigi ringan', 'Mouthwash antiseptik, Sikat gigi khusus', 250000, 'Selesai'),
('Panut Member', 'panut@gmail.com', '2024-12-15', 'Tambal Gigi', 'drg. Andi (Konservasi)', 'Karies gigi molar kanan atas', 'Paracetamol 500mg, Hindari makanan keras', 350000, 'Selesai'),
('Panut Member', 'panut@gmail.com', '2024-11-10', 'Konsultasi Pemasangan Behel', 'drg. Budi (Ortodonti)', 'Maloklusi ringan', 'X-Ray panoramik (terlampir)', 150000, 'Selesai')
ON CONFLICT DO NOTHING;

SELECT * FROM catatan_kesehatan ORDER BY tanggal DESC;
