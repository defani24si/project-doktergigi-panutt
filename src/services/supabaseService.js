import axios from 'axios';

const API_URL = "https://mmyvzrocqjfjmahreewr.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1teXZ6cm9jcWpmam1haHJlZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMDI4NTEsImV4cCI6MjA5Njg3ODg1MX0.ffrv0RJ_LPTH_vXsyk0usvG0PHv8QsMaD9fEEZa3Vms";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

// =====================================================
// MAPPERS: DB (snake_case) <-> Frontend (camelCase)
// =====================================================

// ---- PASIEN ----
const pasienFromDb = (r) => ({
  uuid: r.id,
  id: r.pasien_id,
  nama: r.nama,
  umur: r.umur,
  tanggalLahir: r.tanggal_lahir,
  jenisKelamin: r.jenis_kelamin,
  noHp: r.no_hp,
  alamat: r.alamat,
  terakhirKunjungan: r.terakhir_kunjungan,
  status: r.status,
  levelMembership: r.level_membership,
  referralCode: r.referral_code,
  jenisPerwatan: r.jenis_perawatan,
  totalBiaya: r.total_biaya,
  metodePembayaran: r.metode_pembayaran,
  feedback: r.feedback,
  sumber: r.sumber,
  riwayatKunjungan: r.riwayat_kunjungan,
  riwayatMedis: [],
  riwayatJanji: [],
  riwayatPembayaran: [],
});

const pasienToDb = (f) => ({
  nama: f.nama,
  umur: f.umur || null,
  tanggal_lahir: f.tanggalLahir || null,
  jenis_kelamin: f.jenisKelamin || null,
  no_hp: f.noHp || null,
  alamat: f.alamat || null,
  terakhir_kunjungan: f.terakhirKunjungan && f.terakhirKunjungan !== "-" ? f.terakhirKunjungan : null,
  status: f.status || 'Aktif',
  level_membership: f.levelMembership || 'Regular',
  referral_code: f.referralCode || null,
  jenis_perawatan: f.jenisPerwatan || null,
  total_biaya: f.totalBiaya ? Number(f.totalBiaya) : 0,
  metode_pembayaran: f.metodePembayaran || null,
  feedback: f.feedback || f.catatan || null,
  sumber: f.sumber || null,
});

// ---- DOKTER ----
const dokterFromDb = (r) => ({
  uuid: r.id,
  id: r.dokter_id,
  nama: r.nama,
  spesialis: r.spesialis,
  noHp: r.no_hp,
  email: r.email,
  jadwal: r.jadwal,
  status: r.status,
  riwayatPasien: [],
});

const dokterToDb = (f) => ({
  nama: f.nama,
  spesialis: f.spesialis || null,
  no_hp: f.noHp || null,
  email: f.email || null,
  jadwal: f.jadwal || null,
  status: f.status || 'Aktif',
});

// ---- JANJI TEMU ----
const janjiFromDb = (r) => ({
  uuid: r.id,
  id: r.janji_id,
  pasienNama: r.pasien_nama,
  dokterNama: r.dokter_nama,
  tanggal: r.tanggal,
  jam: r.jam ? r.jam.slice(0, 5) : r.jam,
  layanan: r.layanan,
  keluhan: r.keluhan,
  status: r.status,
});

const janjiToDb = (f) => ({
  pasien_nama: f.pasienNama,
  dokter_nama: f.dokterNama,
  tanggal: f.tanggal,
  jam: f.jam,
  layanan: f.layanan,
  keluhan: f.keluhan || null,
  status: f.status || 'Menunggu',
});

// ---- DISKON ----
const diskonFromDb = (r) => ({
  id: r.id,
  kode: r.kode,
  nama: r.nama,
  diskon: r.diskon,
  minBeli: r.min_beli,
  berlakuHingga: r.berlaku_hingga,
  status: r.status,
});

const diskonToDb = (f) => ({
  kode: f.kode,
  nama: f.nama,
  diskon: Number(f.diskon) || 0,
  min_beli: Number(f.minBeli) || 0,
  berlaku_hingga: f.berlakuHingga || null,
  status: f.status || 'Aktif',
});

// ---- SERVICE AUTOMATION ----
const automationFromDb = (r) => ({
  id: r.id,
  nama: r.nama,
  channel: r.channel,
  trigger: r.trigger_event,
  pesan: r.pesan,
  status: r.status,
});

const automationToDb = (f) => ({
  nama: f.nama,
  channel: f.channel || 'WhatsApp',
  trigger_event: f.trigger,
  pesan: f.pesan,
  status: f.status || 'Aktif',
});

// Helper: generate ID berurutan (PT0001, DK-001, JT-001)
const padNum = (n, len) => String(n).padStart(len, "0");

// =====================================================
// PASIEN SERVICE
// =====================================================
export const pasienService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/pasien?order=created_at.desc`, { headers });
    return res.data.map(pasienFromDb);
  },

  async create(form) {
    // Generate pasien_id berikutnya
    const res = await axios.get(`${API_URL}/pasien?select=pasien_id`, { headers });
    const nextNum = res.data.length + 1;
    const payload = {
      ...pasienToDb(form),
      pasien_id: `PT${padNum(nextNum, 4)}`,
    };
    const created = await axios.post(`${API_URL}/pasien`, payload, { headers });
    return pasienFromDb(created.data[0]);
  },

  async update(uuid, form) {
    const created = await axios.patch(`${API_URL}/pasien?id=eq.${uuid}`, pasienToDb(form), { headers });
    return pasienFromDb(created.data[0]);
  },

  async delete(uuid) {
    await axios.delete(`${API_URL}/pasien?id=eq.${uuid}`, { headers });
  },
};

// =====================================================
// DOKTER SERVICE
// =====================================================
export const dokterService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/dokter?order=created_at.desc`, { headers });
    return res.data.map(dokterFromDb);
  },

  async create(form) {
    const res = await axios.get(`${API_URL}/dokter?select=dokter_id`, { headers });
    const nextNum = res.data.length + 1;
    const payload = {
      ...dokterToDb(form),
      dokter_id: `DK-${padNum(nextNum, 3)}`,
    };
    const created = await axios.post(`${API_URL}/dokter`, payload, { headers });
    return dokterFromDb(created.data[0]);
  },

  async update(uuid, form) {
    const created = await axios.patch(`${API_URL}/dokter?id=eq.${uuid}`, dokterToDb(form), { headers });
    return dokterFromDb(created.data[0]);
  },

  async delete(uuid) {
    await axios.delete(`${API_URL}/dokter?id=eq.${uuid}`, { headers });
  },
};

// =====================================================
// JANJI TEMU SERVICE
// =====================================================
export const janjiTemuService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/janji_temu?order=tanggal.desc,jam.desc`, { headers });
    return res.data.map(janjiFromDb);
  },

  async create(form) {
    const res = await axios.get(`${API_URL}/janji_temu?select=janji_id`, { headers });
    const nextNum = res.data.length + 1;
    const payload = {
      ...janjiToDb(form),
      janji_id: `JT-${padNum(nextNum, 3)}`,
    };
    const created = await axios.post(`${API_URL}/janji_temu`, payload, { headers });
    return janjiFromDb(created.data[0]);
  },

  async update(uuid, form) {
    const created = await axios.patch(`${API_URL}/janji_temu?id=eq.${uuid}`, janjiToDb(form), { headers });
    return janjiFromDb(created.data[0]);
  },

  async updateStatus(uuid, status) {
    const created = await axios.patch(`${API_URL}/janji_temu?id=eq.${uuid}`, { status }, { headers });
    return janjiFromDb(created.data[0]);
  },

  async delete(uuid) {
    await axios.delete(`${API_URL}/janji_temu?id=eq.${uuid}`, { headers });
  },
};

// =====================================================
// DISKON SERVICE
// =====================================================
export const diskonService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/diskon?order=created_at.desc`, { headers });
    return res.data.map(diskonFromDb);
  },

  async create(form) {
    const created = await axios.post(`${API_URL}/diskon`, diskonToDb(form), { headers });
    return diskonFromDb(created.data[0]);
  },

  async update(id, form) {
    const created = await axios.patch(`${API_URL}/diskon?id=eq.${id}`, diskonToDb(form), { headers });
    return diskonFromDb(created.data[0]);
  },

  async updateStatus(id, status) {
    const created = await axios.patch(`${API_URL}/diskon?id=eq.${id}`, { status }, { headers });
    return diskonFromDb(created.data[0]);
  },

  async delete(id) {
    await axios.delete(`${API_URL}/diskon?id=eq.${id}`, { headers });
  },
};

// =====================================================
// SERVICE AUTOMATION SERVICE
// =====================================================
export const automationService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/service_automation?order=created_at.asc`, { headers });
    return res.data.map(automationFromDb);
  },

  async create(form) {
    const created = await axios.post(`${API_URL}/service_automation`, automationToDb(form), { headers });
    return automationFromDb(created.data[0]);
  },

  async update(id, form) {
    const created = await axios.patch(`${API_URL}/service_automation?id=eq.${id}`, automationToDb(form), { headers });
    return automationFromDb(created.data[0]);
  },

  async updateStatus(id, status) {
    const created = await axios.patch(`${API_URL}/service_automation?id=eq.${id}`, { status }, { headers });
    return automationFromDb(created.data[0]);
  },

  async delete(id) {
    await axios.delete(`${API_URL}/service_automation?id=eq.${id}`, { headers });
  },
};

// =====================================================
// CATATAN KESEHATAN SERVICE
// =====================================================
export const catatanKesehatanService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/catatan_kesehatan?order=tanggal.desc`, { headers });
    return res.data;
  },

  async getByEmail(email) {
    const res = await axios.get(`${API_URL}/catatan_kesehatan?pasien_email=eq.${encodeURIComponent(email)}&order=tanggal.desc`, { headers });
    return res.data;
  },

  async getByNama(nama) {
    const res = await axios.get(`${API_URL}/catatan_kesehatan?pasien_nama=eq.${encodeURIComponent(nama)}&order=tanggal.desc`, { headers });
    return res.data;
  },

  async create(data) {
    const payload = {
      pasien_nama: data.pasienNama,
      pasien_email: data.pasienEmail || null,
      tanggal: data.tanggal,
      tindakan: data.tindakan,
      dokter: data.dokter || null,
      diagnosis: data.diagnosis || null,
      resep: data.resep || null,
      biaya: Number(data.biaya) || 0,
      status: data.status || 'Selesai',
    };
    const res = await axios.post(`${API_URL}/catatan_kesehatan`, payload, { headers });
    return res.data[0];
  },

  async update(id, data) {
    const payload = {
      pasien_nama: data.pasienNama,
      pasien_email: data.pasienEmail || null,
      tanggal: data.tanggal,
      tindakan: data.tindakan,
      dokter: data.dokter || null,
      diagnosis: data.diagnosis || null,
      resep: data.resep || null,
      biaya: Number(data.biaya) || 0,
      status: data.status || 'Selesai',
    };
    const res = await axios.patch(`${API_URL}/catatan_kesehatan?id=eq.${id}`, payload, { headers });
    return res.data[0];
  },

  async delete(id) {
    await axios.delete(`${API_URL}/catatan_kesehatan?id=eq.${id}`, { headers });
  },
};

// =====================================================
// TRANSAKSI SERVICE
// =====================================================
export const transaksiService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/transaksi?order=tanggal.desc`, { headers });
    return res.data;
  },

  async getByEmail(email) {
    const res = await axios.get(`${API_URL}/transaksi?pasien_email=eq.${encodeURIComponent(email)}&order=tanggal.desc`, { headers });
    return res.data;
  },

  async create(data) {
    // Generate ID
    const res = await axios.get(`${API_URL}/transaksi?select=trx_id`, { headers });
    const nextNum = res.data.length + 1;
    const trxId = `TRX-${String(nextNum).padStart(3, "0")}`;
    const year = new Date().getFullYear();
    const invoice = `INV-${year}-${String(nextNum).padStart(3, "0")}`;

    const payload = {
      trx_id: trxId,
      invoice,
      pasien_nama: data.pasienNama,
      pasien_email: data.pasienEmail || null,
      layanan: data.layanan,
      dokter_nama: data.dokterNama || null,
      tanggal: data.tanggal,
      biaya: Number(data.biaya) || 0,
      diskon_persen: Number(data.diskonPersen) || 0,
      diskon_nominal: Number(data.diskonNominal) || 0,
      total: Number(data.total) || Number(data.biaya) || 0,
      metode_pembayaran: data.metodePembayaran || null,
      kode_promo: data.kodePromo || null,
      status: data.status || 'Pending',
      catatan: data.catatan || null,
    };
    const created = await axios.post(`${API_URL}/transaksi`, payload, { headers });
    return created.data[0];
  },

  async updateStatus(id, status) {
    const res = await axios.patch(`${API_URL}/transaksi?id=eq.${id}`, { status }, { headers });
    return res.data[0];
  },

  async update(id, data) {
    const res = await axios.patch(`${API_URL}/transaksi?id=eq.${id}`, data, { headers });
    return res.data[0];
  },

  async delete(id) {
    await axios.delete(`${API_URL}/transaksi?id=eq.${id}`, { headers });
  },
};

// =====================================================
// FEEDBACK & RATING SERVICE
// =====================================================
export const feedbackService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/feedback?order=created_at.desc`, { headers });
    return res.data;
  },

  async create(data) {
    const payload = {
      nama: data.nama,
      email: data.email || null,
      rating: Number(data.rating) || 5,
      layanan: data.layanan || null,
      komentar: data.komentar || null,
    };
    const res = await axios.post(`${API_URL}/feedback`, payload, { headers });
    return res.data[0];
  },

  async delete(id) {
    await axios.delete(`${API_URL}/feedback?id=eq.${id}`, { headers });
  },
};

// =====================================================
// USER SERVICE
// =====================================================
export const userService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/users?order=created_at.desc`, { headers });
    return res.data;
  },

  async getById(id) {
    const res = await axios.get(`${API_URL}/users?id=eq.${id}`, { headers });
    return res.data[0];
  },

  async update(id, data) {
    const res = await axios.patch(`${API_URL}/users?id=eq.${id}`, data, { headers });
    return res.data[0];
  },
};
