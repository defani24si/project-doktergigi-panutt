# Product Requirements Document (PRD)
# Integrasi Supabase untuk Sistem Management Klinik Gigi

---

## 📋 INFORMASI PROYEK

**Nama Proyek:** Panutt Apps - Sistem Manajemen Klinik Gigi  
**Versi PRD:** 1.0  
**Tanggal:** 28 Juni 2026  
**Tech Stack:**
- Frontend: React JS (JSX) + React Router v7
- BaaS: Supabase (Authentication & Database PostgreSQL)
- Styling: Tailwind CSS v4
- UI Components: Shadcn UI (Radix UI)
- State Management: React Context API
- HTTP Client: Axios (untuk API eksternal jika diperlukan)

---

## 🎯 TUJUAN INTEGRASI

Mengintegrasikan Supabase sebagai backend service untuk:
1. **Autentikasi pengguna** dengan role-based access (Admin, Member, Guest)
2. **Database management** untuk Customer, Orders, Products
3. **Sistem Poin & Tiering Member** (Bronze, Silver, Gold, Platinum)
4. **Row Level Security (RLS)** untuk keamanan data

---

## 🚨 BATASAN STRICT & SAFETY RULES

### ❌ DILARANG KERAS:

1. **OVER-ENGINEERING**
   - Jangan membuat abstraksi kompleks atau layer berlebihan
   - Gunakan logika langsung dan sederhana
   - Hindari pattern seperti Repository, Factory, atau abstraksi yang tidak diperlukan

2. **MENGUBAH KODE YANG TIDAK RELEVAN**
   - **WAJIB** mengikuti pola kode yang sudah ada
   - **DILARANG** refactor komponen UI yang sudah jadi
   - **DILARANG** mengubah style, layout, atau komponen visual tanpa instruksi
   - **DILARANG** mengganti naming convention yang sudah ada
   - Hanya tambahkan integrasi logika backend

3. **MERUSAK STRUKTUR YANG ADA**
   - Jangan menimpa file komponen UI
   - Jangan ubah struktur folder yang sudah ada
   - Jangan hapus atau rename file/komponen existing tanpa alasan kuat


4. **MENYIMPANG DARI POLA PROJECT**
   - Ikuti penamaan variabel: `camelCase` untuk variabel/function
   - Gunakan Context API seperti `ClinicContext.jsx` yang sudah ada
   - Gunakan komponen UI yang sudah tersedia di `/src/components`
   - Ikuti struktur routing yang sudah ada di `App.jsx`

### ✅ YANG BOLEH DILAKUKAN:

1. Membuat file baru untuk service Supabase (`/src/services/supabase.js`, dll)
2. Menambahkan environment variable untuk konfigurasi
3. Binding data Supabase ke komponen yang sudah ada (non-invasive)
4. Menambahkan state management untuk data dari Supabase
5. Menambahkan Protected Routes untuk role-based access
6. Membuat utility functions untuk helper

---

## 📊 STATUS PROYEK SAAT INI

### ✅ Yang Sudah Ada:
- UI halaman Admin: Dashboard,  (Pasien), 
- UI halaman Auth: Login, Register, Forgot Password
- UI halaman Guest: Landing Page, Layanan Dokter, Booking, Cek Status
- UI halaman Member: Member Dashboard
- Routing dengan React Router v7
- Context API (`ClinicContext`) dengan data dummy
- Komponen UI: Card, Table, Badge, Alert, Button, Modal, dll (sesuai Shadcn UI)

### ❌ Yang Belum Ada:
- Konfigurasi Supabase Client
- Skema Database di Supabase
- Row Level Security (RLS)
- Fungsi CRUD yang terintegrasi dengan Supabase
- Autentikasi Supabase yang terintegrasi
- Protected Routes berdasarkan role
- Sistem Poin & Tiering Member

---

## 🎭 ROLE & AKSES PENGGUNA

### 1. **Guest (Pengunjung - Tidak Login)**
**Akses:**
- Landing Page (`/`, `/guest`)
- Layanan Dokter (`/guest/layanan`)
- Booking Guest (`/guest/booking`)
- Cek Status Appointment (`/guest/cek-status`)
- Register & Login (`/register`, `/login`)


**Fitur:**
- Melihat layanan klinik
- Membuat appointment tanpa login (dengan kode booking)
- Cek status appointment dengan kode booking

### 2. **Member (Pasien Terdaftar - Harus Login)**
**Akses:**
- Member Dashboard (`/member`)
- Buat Appointment (dengan poin otomatis)
- History Orders/Appointment
- Profile Management

**Fitur:**
- Membuat appointment dengan akun member
- Mendapatkan poin otomatis per transaksi
- Melihat history pemesanan
- Naik tier berdasarkan akumulasi poin
- Mendapatkan diskon sesuai tier membership

**Tier & Benefit:**
- 🥉 **Bronze** (Default, 0-499 poin): Diskon 5%
- 🥈 **Silver** (500-999 poin): Diskon 10%
- 🥇 **Gold** (1000-1999 poin): Diskon 15%
- 💎 **Platinum** (2000+ poin): Diskon 20%


### 3. **Admin (Pengelola Klinik - Harus Login)**
**Akses:**
- Admin Dashboard (`/admin`)
- Manajemen Pasien (CRUD) (`/pasien`)
- Manajemen Dokter (CRUD) (`/dokter`)
- Manajemen Appointment (CRUD) (`/janji-temu`)
- Manajemen Diskon (`/diskon`)
- Service Automation (`/service-automation`)
- Klaim Reward (`/klaim-reward`)

**Fitur:**
- CRUD Customer (Pasien)
- CRUD Orders (Appointment)
- CRUD Products (Layanan/Tindakan)
- Melihat Dashboard statistik (Total Pasien, Janji Selesai, Kasus Mendesak)
- Manage member tier secara manual (jika diperlukan)

---

## 📐 DESAIN DATABASE SUPABASE

### 1. Tabel: `profiles`
**Deskripsi:** Extended user profile dari Supabase Auth


| Kolom | Tipe Data | Constraint | Keterangan |
|-------|-----------|------------|------------|
| `id` | UUID | PRIMARY KEY, REFERENCES auth.users(id) | ID user dari Supabase Auth |
| `email` | TEXT | NOT NULL, UNIQUE | Email pengguna |
| `full_name` | TEXT | NOT NULL | Nama lengkap |
| `phone` | TEXT | NULL | Nomor telepon |
| `role` | TEXT | NOT NULL, DEFAULT 'member' | Role: 'admin', 'member', 'guest' |
| `membership_tier` | TEXT | NOT NULL, DEFAULT 'Bronze' | Tier: 'Bronze', 'Silver', 'Gold', 'Platinum' |
| `total_points` | INTEGER | NOT NULL, DEFAULT 0 | Total poin yang dimiliki |
| `referral_code` | TEXT | UNIQUE | Kode referral unik per user |
| `avatar_url` | TEXT | NULL | URL foto profil |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu dibuat |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu update terakhir |

**Index:**
- `idx_profiles_email` ON `email`
- `idx_profiles_role` ON `role`
- `idx_profiles_referral_code` ON `referral_code`

---

### 2. Tabel: `customers`
**Deskripsi:** Data pasien/customer klinik (untuk admin management)


| Kolom | Tipe Data | Constraint | Keterangan |
|-------|-----------|------------|------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | ID unik customer |
| `customer_id` | TEXT | UNIQUE, NOT NULL | ID customer format CUS-001 |
| `user_id` | UUID | NULL, REFERENCES profiles(id) | Relasi ke user jika terdaftar |
| `name` | TEXT | NOT NULL | Nama customer |
| `email` | TEXT | NOT NULL | Email customer |
| `phone` | TEXT | NOT NULL | Nomor telepon |
| `address` | TEXT | NULL | Alamat lengkap |
| `date_of_birth` | DATE | NULL | Tanggal lahir |
| `gender` | TEXT | NULL | Jenis kelamin: 'L', 'P' |
| `membership_tier` | TEXT | NOT NULL, DEFAULT 'Bronze' | Tier membership |
| `total_points` | INTEGER | NOT NULL, DEFAULT 0 | Total poin |
| `last_visit` | DATE | NULL | Tanggal kunjungan terakhir |
| `status` | TEXT | NOT NULL, DEFAULT 'Aktif' | Status: 'Aktif', 'Tidak Aktif' |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu dibuat |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu update |

**Index:**
- `idx_customers_customer_id` ON `customer_id`
- `idx_customers_user_id` ON `user_id`
- `idx_customers_email` ON `email`


---

### 3. Tabel: `products`
**Deskripsi:** Layanan/tindakan yang tersedia di klinik

| Kolom | Tipe Data | Constraint | Keterangan |
|-------|-----------|------------|------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | ID unik produk |
| `product_id` | TEXT | UNIQUE, NOT NULL | ID produk format PRD-001 |
| `name` | TEXT | NOT NULL | Nama layanan/tindakan |
| `description` | TEXT | NULL | Deskripsi layanan |
| `category` | TEXT | NOT NULL | Kategori: 'Umum', 'Periodonti', 'Ortodonti', dll |
| `price` | NUMERIC(12,2) | NOT NULL | Harga layanan |
| `duration_minutes` | INTEGER | NULL | Durasi estimasi (menit) |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Status aktif |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu dibuat |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu update |

**Index:**
- `idx_products_product_id` ON `product_id`
- `idx_products_category` ON `category`
- `idx_products_is_active` ON `is_active`

---

### 4. Tabel: `orders`
**Deskripsi:** Pesanan/appointment pasien


| Kolom | Tipe Data | Constraint | Keterangan |
|-------|-----------|------------|------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | ID unik order |
| `order_id` | TEXT | UNIQUE, NOT NULL | ID order format ORD-001 |
| `customer_id` | UUID | NOT NULL, REFERENCES customers(id) | Relasi ke customer |
| `user_id` | UUID | NULL, REFERENCES profiles(id) | Relasi ke user jika member |
| `product_id` | UUID | NOT NULL, REFERENCES products(id) | Relasi ke produk/layanan |
| `doctor_name` | TEXT | NULL | Nama dokter yang menangani |
| `appointment_date` | DATE | NOT NULL | Tanggal appointment |
| `appointment_time` | TIME | NOT NULL | Jam appointment |
| `status` | TEXT | NOT NULL, DEFAULT 'Pending' | Status: 'Pending', 'Completed', 'Cancelled' |
| `complaint` | TEXT | NULL | Keluhan pasien |
| `notes` | TEXT | NULL | Catatan tambahan |
| `subtotal` | NUMERIC(12,2) | NOT NULL | Subtotal sebelum diskon |
| `discount_percentage` | NUMERIC(5,2) | DEFAULT 0 | Persentase diskon dari tier |
| `discount_amount` | NUMERIC(12,2) | DEFAULT 0 | Nominal diskon |
| `total_price` | NUMERIC(12,2) | NOT NULL | Total harga setelah diskon |
| `points_earned` | INTEGER | DEFAULT 0 | Poin yang didapat dari order ini |
| `payment_method` | TEXT | NULL | Metode pembayaran |
| `booking_code` | TEXT | UNIQUE | Kode booking untuk guest |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu dibuat |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu update |

**Index:**
- `idx_orders_order_id` ON `order_id`
- `idx_orders_customer_id` ON `customer_id`
- `idx_orders_user_id` ON `user_id`
- `idx_orders_status` ON `status`
- `idx_orders_booking_code` ON `booking_code`
- `idx_orders_appointment_date` ON `appointment_date`

---

### 5. Tabel: `doctors`
**Deskripsi:** Data dokter di klinik


| Kolom | Tipe Data | Constraint | Keterangan |
|-------|-----------|------------|------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | ID unik dokter |
| `doctor_id` | TEXT | UNIQUE, NOT NULL | ID dokter format DK-001 |
| `name` | TEXT | NOT NULL | Nama dokter |
| `specialization` | TEXT | NOT NULL | Spesialisasi |
| `phone` | TEXT | NOT NULL | Nomor telepon |
| `email` | TEXT | NOT NULL, UNIQUE | Email dokter |
| `schedule` | TEXT | NULL | Jadwal praktik |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Status aktif |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu dibuat |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu update |

**Index:**
- `idx_doctors_doctor_id` ON `doctor_id`
- `idx_doctors_email` ON `email`
- `idx_doctors_is_active` ON `is_active`

---

### 6. Tabel: `point_transactions`
**Deskripsi:** History transaksi poin member

| Kolom | Tipe Data | Constraint | Keterangan |
|-------|-----------|------------|------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | ID transaksi |
| `user_id` | UUID | NOT NULL, REFERENCES profiles(id) | Relasi ke user |
| `order_id` | UUID | NULL, REFERENCES orders(id) | Relasi ke order (jika dari pembelian) |
| `points` | INTEGER | NOT NULL | Jumlah poin (+/-) |
| `transaction_type` | TEXT | NOT NULL | Tipe: 'earned', 'redeemed', 'adjustment' |
| `description` | TEXT | NULL | Deskripsi transaksi |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Waktu transaksi |

**Index:**
- `idx_point_transactions_user_id` ON `user_id`
- `idx_point_transactions_order_id` ON `order_id`

---

## 🔐 ROW LEVEL SECURITY (RLS) POLICIES

### Tabel: `profiles`


**Policy:**
1. **SELECT:** User dapat melihat profil sendiri, Admin dapat melihat semua
2. **INSERT:** Otomatis saat register via trigger
3. **UPDATE:** User dapat update profil sendiri, Admin dapat update semua
4. **DELETE:** Hanya Admin yang dapat menghapus

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

-- DELETE: Hanya admin
CREATE POLICY "profiles_delete_policy" ON profiles
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### Tabel: `customers`

**Policy:**
1. **SELECT:** Admin dapat melihat semua, Member dapat melihat data dirinya (via user_id)
2. **INSERT:** Hanya Admin
3. **UPDATE:** Hanya Admin
4. **DELETE:** Hanya Admin


```sql
-- SELECT: Admin semua, member lihat data sendiri via user_id
CREATE POLICY "customers_select_policy" ON customers
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') OR
    user_id = auth.uid()
  );

-- INSERT, UPDATE, DELETE: Hanya Admin
CREATE POLICY "customers_insert_policy" ON customers
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "customers_update_policy" ON customers
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "customers_delete_policy" ON customers
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### Tabel: `products`

**Policy:**
1. **SELECT:** Semua user (termasuk guest) dapat melihat produk aktif
2. **INSERT/UPDATE/DELETE:** Hanya Admin


```sql
-- SELECT: Semua orang bisa lihat produk aktif
CREATE POLICY "products_select_policy" ON products
  FOR SELECT
  USING (is_active = TRUE);

-- INSERT, UPDATE, DELETE: Hanya Admin
CREATE POLICY "products_insert_policy" ON products
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "products_update_policy" ON products
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "products_delete_policy" ON products
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### Tabel: `orders`

**Policy:**
1. **SELECT:** Admin lihat semua, Member lihat order sendiri, Guest lihat via booking_code
2. **INSERT:** Admin dan Member dapat membuat order
3. **UPDATE:** Admin dapat update semua, Member dapat update order sendiri (status Pending saja)
4. **DELETE:** Hanya Admin


```sql
-- SELECT: Admin semua, member order sendiri
CREATE POLICY "orders_select_policy" ON orders
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') OR
    user_id = auth.uid()
  );

-- INSERT: Admin dan member bisa buat order
CREATE POLICY "orders_insert_policy" ON orders
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'member'))
  );

-- UPDATE: Admin semua, member update sendiri (Pending only)
CREATE POLICY "orders_update_policy" ON orders
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') OR
    (user_id = auth.uid() AND status = 'Pending')
  );

-- DELETE: Hanya admin
CREATE POLICY "orders_delete_policy" ON orders
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### Tabel: `doctors`

**Policy:**
1. **SELECT:** Semua user dapat melihat dokter aktif
2. **INSERT/UPDATE/DELETE:** Hanya Admin


```sql
-- SELECT: Semua bisa lihat dokter aktif
CREATE POLICY "doctors_select_policy" ON doctors
  FOR SELECT
  USING (is_active = TRUE);

-- INSERT, UPDATE, DELETE: Hanya Admin
CREATE POLICY "doctors_insert_policy" ON doctors
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "doctors_update_policy" ON doctors
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "doctors_delete_policy" ON doctors
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

### Tabel: `point_transactions`

**Policy:**
1. **SELECT:** Admin lihat semua, Member lihat transaksi sendiri
2. **INSERT:** Admin dan sistem (via trigger)
3. **UPDATE/DELETE:** Hanya Admin


```sql
-- SELECT: Admin semua, member lihat transaksi sendiri
CREATE POLICY "point_transactions_select_policy" ON point_transactions
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') OR
    user_id = auth.uid()
  );

-- INSERT: Admin dan sistem
CREATE POLICY "point_transactions_insert_policy" ON point_transactions
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- UPDATE, DELETE: Hanya Admin
CREATE POLICY "point_transactions_update_policy" ON point_transactions
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "point_transactions_delete_policy" ON point_transactions
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## 🔄 DATABASE TRIGGERS & FUNCTIONS

### 1. Trigger: Auto-create Profile saat User Register


```sql
-- Function untuk auto-create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member'),
    'DEN' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger yang menjalankan function di atas
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

### 2. Trigger: Update Membership Tier Based on Points


```sql
-- Function untuk update tier membership otomatis
CREATE OR REPLACE FUNCTION public.update_membership_tier()
RETURNS TRIGGER AS $$
DECLARE
  new_tier TEXT;
BEGIN
  -- Tentukan tier berdasarkan total_points
  IF NEW.total_points >= 2000 THEN
    new_tier := 'Platinum';
  ELSIF NEW.total_points >= 1000 THEN
    new_tier := 'Gold';
  ELSIF NEW.total_points >= 500 THEN
    new_tier := 'Silver';
  ELSE
    new_tier := 'Bronze';
  END IF;

  -- Update tier jika berubah
  IF NEW.membership_tier != new_tier THEN
    NEW.membership_tier := new_tier;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pada profiles
CREATE TRIGGER update_profile_tier
  BEFORE UPDATE OF total_points ON profiles
  FOR EACH ROW
  WHEN (OLD.total_points IS DISTINCT FROM NEW.total_points)
  EXECUTE FUNCTION public.update_membership_tier();

-- Trigger pada customers
CREATE TRIGGER update_customer_tier
  BEFORE UPDATE OF total_points ON customers
  FOR EACH ROW
  WHEN (OLD.total_points IS DISTINCT FROM NEW.total_points)
  EXECUTE FUNCTION public.update_membership_tier();
```

---

### 3. Trigger: Calculate Points on Order Completion
