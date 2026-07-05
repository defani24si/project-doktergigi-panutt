-- =====================================================
-- TAMBAH USER "pnut" 
-- =====================================================

-- Insert user baru dengan username "pnut"
INSERT INTO users (full_name, email, password, role) 
VALUES ('Panut Member', 'pnut@gmail.com', 'pnut123', 'member')
ON CONFLICT (email) DO UPDATE 
SET full_name = 'Panut Member', password = 'pnut123', role = 'member';

-- Atau update user yang sudah ada
UPDATE users 
SET 
  full_name = 'Panut Member',
  password = 'pnut123',
  role = 'member'
WHERE email = 'panut@gmail.com';

-- Check hasil
SELECT id, full_name, email, role, created_at 
FROM users 
WHERE email IN ('pnut@gmail.com', 'panut@gmail.com')
ORDER BY email;

-- =====================================================
-- ALTERNATIF: Buat alias login (terima pnut atau panut)
-- =====================================================
-- Buat 2 user dengan nama yang sama tapi email berbeda

INSERT INTO users (full_name, email, password, role) VALUES
('Panut Member', 'pnut@gmail.com', 'pnut123', 'member'),
('Panut Member', 'panut@gmail.com', 'panut123', 'member')
ON CONFLICT (email) DO UPDATE 
SET full_name = EXCLUDED.full_name, password = EXCLUDED.password, role = EXCLUDED.role;

-- Check
SELECT id, full_name, email, role FROM users WHERE full_name = 'Panut Member';
