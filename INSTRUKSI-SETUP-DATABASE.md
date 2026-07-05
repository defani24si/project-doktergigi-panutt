# 🚀 Instruksi Setup Database Supabase - Panutt Clinic

## ✅ Yang Sudah Saya Lakukan:

### 1. **File Baru:**
- `SQL-CREATE-ALL-TABLES.sql` - SQL untuk buat semua tabel
- `src/services/supabaseService.js` - Service CRUD untuk Pasien, Dokter, Janji Temu
- `src/services/authServiceSimple.js` - Service Login/Register
- `src/components/Header.jsx` - Header dengan nama user yang login

### 2. **File Diupdate:**
- `src/context/ClinicContext.jsx` - Fetch data dari Supabase
- `src/pages/auth/Login.jsx` - Login menggunakan Supabase
- `src/pages/auth/Register.jsx` - Register ke Supabase
- `.env.local` - Sudah diisi dengan key yang benar

---

## 🎯 LANGKAH-LANGKAH SETUP:

### Step 1: Jalankan SQL di Supabase

1. **Buka Supabase Dashboard**:  
   https://supabase.com/dashboard/project/mmyvzrocqjfjmahreewr/sql

2. **Copy semua isi file** `SQL-CREATE-ALL-TABLES.sql`

3. **Paste ke SQL Editor** dan **Klik "Run"**

4. **Check hasilnya**: Klik tab "Results", seharusnya muncul data sample

---

### Step 2: Verify Tables

Jalankan query ini untuk verify:

```sql
-- Cek tabel users
SELECT * FROM users;

-- Cek tabel dokter  
SELECT * FROM dokter;

-- Cek tabel pasien
SELECT * FROM pasien LIMIT 5;

-- Cek tabel janji_temu
SELECT * FROM janji_temu;
```

---

### Step 3: Test Login

Server sudah jalan di: **http://localhost:5174/**

#### Login sebagai Admin:
- Email: `admin@panutt.com`
- Password: `admin123`
- Redirect ke: `/admin` (Dashboard Admin)

#### Login sebagai Member (Panut):
- Email: `panut@gmail.com`
- Password: `panut123`
- Redirect ke: `/member` (Member Dashboard)

#### Login sebagai Member Test:
- Email: `member@test.com`
- Password: `member123`
- Redirect ke: `/member`

---

### Step 4: Check Tampilan

Setelah login, cek:

✅ **Header**:
- Nama user harus muncul (misal: "Panut Member")
- Email harus muncul
- Avatar dengan initial nama (misal: "PM" untuk Panut Member)

✅ **Dashboard Admin** (`/admin`):
- Total Pasien (dari database)
- Janji Temu Selesai
- Kunjungan Terakhir (table)

✅ **Halaman Pasien** (`/pasien`):
- Data pasien dari database Supabase
- Button "Add New Pasien" berfungsi
- Data ter-refresh otomatis

✅ **Halaman Dokter** (`/dokter`):
- Data dokter dari database

✅ **Halaman Janji Temu** (`/janji-temu`):
- Data appointment dari database

---

## 🔧 Troubleshooting

### Error: "relation users/dokter/pasien does not exist"
**Solusi:** SQL belum dijalankan. Run SQL di Step 1.

### Data tidak muncul
**Solusi:**
1. Check console browser (F12) untuk error
2. Check Network tab untuk error API
3. Verify RLS policies sudah dibuat

### Login gagal
**Solusi:**
1. Pastikan SQL sudah dijalankan
2. Pastikan user sudah ada di tabel `users`
3. Check console untuk error detail

### User baru tidak muncul di header
**Solusi:**
1. Logout dan login ulang
2. Clear localStorage: `localStorage.clear()`
3. Refresh browser

---

## 📝 Next Steps

Setelah semua jalan:

1. ✅ Login Member & Admin berfungsi
2. ✅ Nama user tampil di header
3. ✅ Data Pasien, Dokter, Janji Temu dari database
4. ⏭️ CRUD Pasien (Create, Read, Update, Delete)
5. ⏭️ CRUD Dokter
6. ⏭️ CRUD Janji Temu
7. ⏭️ Dashboard statistik real-time

---

## 🎉 Test Scenario

### Scenario 1: Login sebagai "Panut"
1. Buka http://localhost:5174/login
2. Login: `panut@gmail.com` / `panut123`
3. **Expected**: Redirect ke `/member`, header tampil "Panut Member"

### Scenario 2: Login sebagai Admin
1. Login: `admin@panutt.com` / `admin123`
2. **Expected**: Redirect ke `/admin`, header tampil "Admin Panutt"
3. Klik **"Manajemen Pasien"** di sidebar
4. **Expected**: Muncul list pasien dari database (PT0001, PT0002, dll)

### Scenario 3: View Dokter
1. Klik **"Manajemen Dokter"**
2. **Expected**: Muncul 5 dokter (DK-001 sampai DK-005)

### Scenario 4: View Janji Temu
1. Klik **"Janji Temu"**
2. **Expected**: Muncul janji temu hari ini (JT-001, JT-002, JT-003)

---

Silakan test dan beritahu saya hasilnya! 🚀
