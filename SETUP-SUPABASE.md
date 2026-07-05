# Setup Supabase untuk Panutt Apps

## 🔑 Langkah 1: Setup Environment Variables

1. Buka projek Supabase Anda: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **Project Settings** (ikon gear) > **API**
4. Copy **Project URL** dan **anon/public key**
5. Paste ke file `.env.local`:

```env
VITE_SUPABASE_URL=https://mmyvzrocqjfjmahreewr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ PENTING:** Key yang benar formatnya sangat panjang dan dimulai dengan `eyJ...`

---

## 🗄️ Langkah 2: Buat Tabel Database

Buka **SQL Editor** di Supabase Dashboard, kemudian jalankan query berikut:

### 1. Buat Tabel `profiles`

```sql
-- Tabel profiles (extend dari auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'guest')),
  membership_tier TEXT NOT NULL DEFAULT 'Bronze' CHECK (membership_tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  total_points INTEGER NOT NULL DEFAULT 0 CHECK (total_points >= 0),
  referral_code TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON profiles(referral_code);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### 2. Buat Function & Trigger Auto-create Profile

```sql
-- Function untuk auto-create profile saat register
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

-- Trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 3. Buat RLS Policies untuk `profiles`

```sql
-- SELECT: User bisa lihat profil sendiri, admin lihat semua
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT
  USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- UPDATE: User update sendiri, admin update semua
CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE
  USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```


---

## 👤 Langkah 3: Buat User Admin Manual

Karena user pertama yang register akan jadi 'member', Anda perlu buat admin manual:

### Opsi A: Via SQL Editor (Recommended)

1. Register user baru via aplikasi (akan jadi member)
2. Buka SQL Editor, jalankan:

```sql
-- Update user jadi admin (ganti email sesuai)
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@example.com';
```

### Opsi B: Via Authentication Dashboard

1. Buka **Authentication** > **Users** di Supabase Dashboard
2. Klik **Invite User** atau **Add User**
3. Masukkan email dan password
4. Setelah user dibuat, jalankan SQL di atas untuk set role admin

---

## 🧪 Langkah 4: Test Login

1. Pastikan `.env.local` sudah terisi dengan benar
2. Restart development server:
   ```bash
   npm run dev
   ```

3. Test Register:
   - Buka `/register`
   - Isi form dan submit
   - Check email untuk verifikasi (jika email confirmation enabled)

4. Test Login:
   - Buka `/login`
   - Login dengan email dan password
   - Jika role 'admin' → redirect ke `/admin`
   - Jika role 'member' → redirect ke `/member`

---

## 🔍 Troubleshooting

### Error: "Invalid API key"
**Solusi:** Pastikan `VITE_SUPABASE_ANON_KEY` di `.env.local` benar (format panjang dimulai `eyJ...`)

### Error: "relation profiles does not exist"
**Solusi:** Jalankan SQL untuk create table `profiles` di SQL Editor

### Error: "new row violates row-level security policy"
**Solusi:** Pastikan RLS policies sudah dibuat dengan benar

### Login gagal terus
**Solusi:** 
1. Check console browser (F12) untuk error detail
2. Pastikan user sudah confirm email (jika email confirmation enabled)
3. Coba disable email confirmation: **Authentication** > **Settings** > **Auth Providers** > **Email** > Disable "Confirm email"

### Profile tidak ter-create otomatis
**Solusi:**
1. Pastikan trigger `on_auth_user_created` sudah dibuat
2. Check di **Database** > **Functions** apakah function `handle_new_user` ada
3. Check di **Database** > **Triggers** apakah trigger ada

---

## 📚 Next Steps

Setelah login berhasil, lanjutkan dengan:
1. Buat tabel `customers`, `products`, `orders`, `doctors`
2. Setup RLS policies untuk semua tabel
3. Buat CRUD service untuk setiap tabel
4. Integrasikan dengan komponen UI yang sudah ada

Lihat `PRD-SUPABASE-INTEGRATION.md` untuk schema lengkap!
