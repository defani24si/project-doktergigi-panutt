# 🔧 Fix Login Member & Admin - Panutt Apps

## 📦 Perubahan yang Sudah Dilakukan

### 1. Install Supabase JS Client
```bash
✅ npm install @supabase/supabase-js
```

### 2. File Baru yang Dibuat

- **`.env.local`** - Environment variables untuk Supabase
- **`src/lib/supabase.js`** - Supabase client configuration
- **`src/services/authService.js`** - Service untuk autentikasi
- **`SETUP-SUPABASE.md`** - Panduan setup database
- **`PRD-SUPABASE-INTEGRATION.md`** - Product Requirements Document lengkap

### 3. File yang Diupdate

- **`src/pages/auth/Login.jsx`** - Menggunakan `authService` bukan `authAPI`
- **`src/pages/auth/Register.jsx`** - Menggunakan `authService` dengan Supabase Auth

---

## 🚀 Cara Setup & Test

### Step 1: Update Environment Variables

1. Buka **Supabase Dashboard**: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **Project Settings** > **API**
4. Copy **Project URL** dan **anon key**
5. Update file `.env.local`:

```env
VITE_SUPABASE_URL=https://mmyvzrocqjfjmahreewr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```

**⚠️ PENTING:** Anon key yang benar sangat panjang (300+ karakter) dan dimulai dengan `eyJ`

---

### Step 2: Setup Database Supabase

Buka **SQL Editor** di Supabase Dashboard, copy-paste dan run script berikut:

```sql
-- 1. Buat tabel profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'guest')),
  membership_tier TEXT NOT NULL DEFAULT 'Bronze',
  total_points INTEGER NOT NULL DEFAULT 0,
  referral_code TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buat index
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- 3. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 4. Function auto-create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member'),
    'DEN' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. RLS Policies
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### Step 3: (Opsional) Disable Email Confirmation

Untuk testing lebih mudah, disable email confirmation:

1. Buka **Authentication** > **Providers** > **Email**
2. **Disable** "Confirm email"
3. Klik **Save**

---

### Step 4: Restart Server

```bash
npm run dev
```

---

### Step 5: Test Register & Login

#### Test Register Member:
1. Buka http://localhost:5173/register
2. Isi form:
   - Full Name: `John Doe`
   - Email: `member@test.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - ✅ Check "I agree to all terms"
3. Klik **Register**
4. Jika berhasil, akan muncul "Pendaftaran Berhasil!"

#### Test Login Member:
1. Buka http://localhost:5173/login
2. Login dengan:
   - Email: `member@test.com`
   - Password: `password123`
3. Jika berhasil → redirect ke `/member`

---

### Step 6: Buat User Admin

#### Cara 1: Via Register + Update SQL
1. Register user baru (akan jadi member)
2. Buka **SQL Editor**, run:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@test.com';
```

#### Cara 2: Via Supabase Dashboard
1. **Authentication** > **Users** > **Add user**
2. Email: `admin@test.com`, Password: `admin123`
3. Auto-confirm user
4. Run SQL di atas untuk set role

#### Test Login Admin:
1. Login dengan email admin
2. Jika berhasil → redirect ke `/admin`

---

## 🐛 Troubleshooting

### ❌ Error: "Invalid API key"
**Penyebab:** Anon key salah  
**Solusi:** 
- Cek lagi di Supabase Dashboard > Project Settings > API
- Pastikan copy **anon key** bukan **service_role key**
- Anon key benar sangat panjang, dimulai `eyJ...`

### ❌ Error: "relation profiles does not exist"
**Penyebab:** Tabel belum dibuat  
**Solusi:** Run SQL script di Step 2

### ❌ Login gagal terus
**Penyebab:** 
1. Email belum diconfirm (jika email confirmation enabled)
2. Password salah
3. User belum ada

**Solusi:**
1. Disable email confirmation (lihat Step 3)
2. Check console browser (F12) untuk error detail
3. Check **Authentication** > **Users** di Supabase apakah user ada

### ❌ Profile tidak ter-create otomatis
**Penyebab:** Trigger belum jalan  
**Solusi:**
1. Check **Database** > **Functions** apakah `handle_new_user` ada
2. Check **Database** > **Triggers** apakah `on_auth_user_created` ada
3. Coba hapus user dan register ulang

---

## 📝 Next Steps

Setelah login berhasil:

1. ✅ Login Member & Admin berfungsi
2. ⏭️ Buat Protected Routes (agar member tidak bisa akses `/admin`)
3. ⏭️ Buat tabel customers, products, orders
4. ⏭️ Buat CRUD service untuk setiap tabel
5. ⏭️ Integrasikan dengan UI yang sudah ada

Lihat **PRD-SUPABASE-INTEGRATION.md** untuk roadmap lengkap!

---

## 📞 Butuh Bantuan?

1. Check console browser (F12) untuk error
2. Check **Logs** di Supabase Dashboard
3. Pastikan semua step sudah diikuti dengan benar
4. Baca **SETUP-SUPABASE.md** untuk detail lebih lengkap
