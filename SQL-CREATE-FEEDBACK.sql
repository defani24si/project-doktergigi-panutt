-- =====================================================
-- TABEL FEEDBACK & RATING
-- =====================================================
-- Jalankan di SQL Editor Supabase

CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  email TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  layanan TEXT,
  komentar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy allow all (development)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'feedback' AND policyname = 'feedback_all') THEN
    CREATE POLICY "feedback_all" ON feedback FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Data sample
INSERT INTO feedback (nama, email, rating, layanan, komentar) VALUES
('Tiara Lestari', 'tiara@email.com', 5, 'Tambal Gigi', 'Pelayanan sangat ramah dan cepat. Dokternya profesional!'),
('Agus Rahma', 'agus@email.com', 4, 'Pemutihan Gigi', 'Klinik bersih dan nyaman. Hasilnya memuaskan.'),
('Budi Maulana', 'budi@email.com', 3, 'Konsultasi Gigi', 'Cukup baik, tapi antriannya agak lama.')
ON CONFLICT DO NOTHING;

-- Check
SELECT * FROM feedback ORDER BY created_at DESC;
