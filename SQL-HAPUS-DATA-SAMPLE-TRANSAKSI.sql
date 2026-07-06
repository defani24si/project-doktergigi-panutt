-- =====================================================
-- HAPUS DATA SAMPLE TRANSAKSI
-- =====================================================
-- Jalankan di SQL Editor Supabase

-- Lihat dulu semua transaksi yang ada
SELECT id, trx_id, pasien_nama, pasien_email, layanan, tanggal, status, created_at
FROM transaksi
ORDER BY created_at DESC;

-- Hapus data sample yang dibuat waktu setup (TRX-001 sampai TRX-004)
DELETE FROM transaksi 
WHERE trx_id IN ('TRX-001', 'TRX-002', 'TRX-003', 'TRX-004');

-- ATAU hapus semua transaksi panut jika ingin reset total
-- DELETE FROM transaksi WHERE pasien_email = 'panut@gmail.com';

-- ATAU hapus SEMUA data transaksi (reset total)
-- TRUNCATE TABLE transaksi;

-- Verify setelah hapus
SELECT COUNT(*) as total_transaksi FROM transaksi;
SELECT * FROM transaksi ORDER BY created_at DESC;
