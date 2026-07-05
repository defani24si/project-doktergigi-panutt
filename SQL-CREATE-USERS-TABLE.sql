-- =====================================================
-- BUAT TABEL USERS (Tanpa Supabase Auth)
-- =====================================================
-- Copy-paste script ini ke SQL Editor di Supabase Dashboard
-- URL: https://supabase.com/dashboard/project/mmyvzrocqjfjmahreewr/sql

-- 1. Buat tabel users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL, -- ⚠️ Plain text (tidak aman, hanya untuk development)
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'guest')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buat index
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Semua orang bisa register (INSERT)
CREATE POLICY "users_insert_policy" ON users
  FOR INSERT
  WITH CHECK (true);

-- 5. RLS Policy: User bisa lihat data sendiri, admin lihat semua
CREATE POLICY "users_select_policy" ON users
  FOR SELECT
  USING (true); -- Sementara allow all, bisa dibatasi nanti

-- 6. RLS Policy: User bisa update data sendiri, admin update semua
CREATE POLICY "users_update_policy" ON users
  FOR UPDATE
  USING (true); -- Sementara allow all

-- 7. INSERT user admin default (opsional)
INSERT INTO public.users (full_name, email, password, role)
VALUES 
  ('Admin Panutt', 'admin@example.com', 'admin123', 'admin'),
  ('Member Test', 'member@example.com', 'member123', 'member')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- QUERY CHECK: Lihat semua users
-- =====================================================
SELECT * FROM users;
