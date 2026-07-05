-- =====================================================
-- TABEL TRANSAKSI
-- =====================================================
-- Jalankan di SQL Editor Supabase

CREATE TABLE IF NOT EXISTS public.transaksi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trx_id TEXT UNIQUE NOT NULL,
  invoice TEXT UNIQUE NOT NULL,
  pasien_nama TEXT NOT NULL,
  pasien_email TEXT,
  layanan TEXT NOT NULL,
  dokter_nama TEXT,
  tanggal DATE NOT NULL,
  biaya NUMERIC(12,2) NOT NULL DEFAULT 0,
  diskon_persen INTEGER DEFAULT 0,
  diskon_nominal NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  metode_pembayaran TEXT,
  kode_promo TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Lunas', 'Pending', 'Dibatalkan')),
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_transaksi_trx_id ON transaksi(trx_id);
CREATE INDEX IF NOT EXISTS idx_transaksi_invoice ON transaksi(invoice);
CREATE INDEX IF NOT EXISTS idx_transaksi_pasien_nama ON transaksi(pasien_nama);
CREATE INDEX IF NOT EXISTS idx_transaksi_status ON transaksi(status);
CREATE INDEX IF NOT EXISTS idx_transaksi_tanggal ON transaksi(tanggal);

-- RLS
ALTER TABLE transaksi ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'transaksi' AND policyname = 'transaksi_all') THEN
    CREATE POLICY "transaksi_all" ON transaksi FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Function auto update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER transaksi_updated_at
  BEFORE UPDATE ON transaksi
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Data sample
INSERT INTO transaksi (trx_id, invoice, pasien_nama, pasien_email, layanan, dokter_nama, tanggal, biaya, diskon_persen, diskon_nominal, total, metode_pembayaran, status) VALUES
('TRX-001', 'INV-2025-001', 'Panut Member', 'panut@gmail.com', 'Scaling Gigi', 'drg. Fikri (Umum)', '2025-01-20', 250000, 0, 0, 250000, 'Transfer Bank', 'Lunas'),
('TRX-002', 'INV-2024-128', 'Panut Member', 'panut@gmail.com', 'Tambal Gigi', 'drg. Andi (Konservasi)', '2024-12-15', 350000, 0, 0, 350000, 'Cash', 'Lunas'),
('TRX-003', 'INV-2024-115', 'Panut Member', 'panut@gmail.com', 'Konsultasi', 'drg. Fikri (Umum)', '2024-11-10', 150000, 0, 0, 150000, 'QRIS', 'Lunas'),
('TRX-004', 'INV-2025-002', 'Panut Member', 'panut@gmail.com', 'Whitening', 'drg. Siti (Bedah Mulut)', '2025-01-25', 750000, 10, 75000, 675000, 'Transfer Bank', 'Pending')
ON CONFLICT (trx_id) DO NOTHING;

-- Check
SELECT * FROM transaksi ORDER BY tanggal DESC;
