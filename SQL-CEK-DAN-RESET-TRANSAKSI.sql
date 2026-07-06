-- =====================================================
-- CEK DAN RESET TRANSAKSI MEMBER
-- =====================================================

-- 1. Lihat SEMUA transaksi yang ada (email panut)
SELECT id, trx_id, pasien_nama, pasien_email, layanan, tanggal, status, created_at
FROM transaksi
WHERE pasien_email = 'panut@gmail.com'
ORDER BY created_at DESC;

-- 2. Lihat SEMUA transaksi (semua user)
SELECT id, trx_id, pasien_nama, pasien_email, layanan, tanggal, status, created_at
FROM transaksi
ORDER BY created_at DESC;

-- 3. HAPUS semua transaksi panut (HATI-HATI: tidak bisa dibatalkan)
-- Uncomment baris di bawah jika ingin hapus:
-- DELETE FROM transaksi WHERE pasien_email = 'panut@gmail.com';

-- 4. HAPUS SEMUA transaksi (reset total) 
-- Uncomment baris di bawah jika ingin reset:
-- TRUNCATE TABLE transaksi;

-- 5. Cek berapa data sekarang
SELECT COUNT(*) as total FROM transaksi;
