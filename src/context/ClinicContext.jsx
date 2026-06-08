import React, { createContext, useContext, useState } from "react";

const INITIAL_DOCTORS = [
  {
    id: "DK-001",
    nama: "drg. Fikri (Umum)",
    spesialis: "Umum",
    noHp: "081211112222",
    email: "fikri@dentiva.id",
    jadwal: "Senin – Jumat, 08:00 – 16:00",
    status: "Aktif",
    riwayatPasien: [
      { id: 1, tanggal: "2026-05-20", pasien: "Andi Pratama", tindakan: "Tambal Komposit" },
      { id: 2, tanggal: "2026-04-15", pasien: "Bapak Wijaya", tindakan: "Odontektomi" }
    ]
  },
  {
    id: "DK-002",
    nama: "drg. Anisa (Periodonti)",
    spesialis: "Periodonti",
    noHp: "081322223333",
    email: "anisa@dentiva.id",
    jadwal: "Selasa – Sabtu, 09:00 – 17:00",
    status: "Aktif",
    riwayatPasien: [
      { id: 1, tanggal: "2026-05-01", pasien: "Siti Rahayu", tindakan: "Scaling" }
    ]
  },
  {
    id: "DK-003",
    nama: "drg. Budi (Ortodonti)",
    spesialis: "Ortodonti",
    noHp: "081433334444",
    email: "budi@dentiva.id",
    jadwal: "Senin – Rabu, 10:00 – 16:00",
    status: "Aktif",
    riwayatPasien: []
  },
  {
    id: "DK-004",
    nama: "drg. Siti (Bedah Mulut)",
    spesialis: "Bedah Mulut",
    noHp: "081544445555",
    email: "siti@dentiva.id",
    jadwal: "Kamis – Sabtu, 08:00 – 14:00",
    status: "Tidak Aktif",
    riwayatPasien: []
  },
  {
    id: "DK-005",
    nama: "drg. Andi (Konservasi Gigi)",
    spesialis: "Konservasi Gigi",
    noHp: "081655556666",
    email: "andi@dentiva.id",
    jadwal: "Senin – Jumat, 13:00 – 20:00",
    status: "Aktif",
    riwayatPasien: [
      { id: 1, tanggal: "2026-05-01", pasien: "Siti Rahayu", tindakan: "Tambal Komposit" }
    ]
  }
];

const INITIAL_PATIENTS = [
  {
    id: "PT0001",
    nama: "Fajar Santoso",
    umur: 34,
    tanggalLahir: "1991-12-16",
    jenisKelamin: "L",
    noHp: "085502258532",
    alamat: "Bangkinang",
    terakhirKunjungan: "2022-10-27",
    status: "Tidak Aktif",
    levelMembership: "Platinum",
    referralCode: "DEN2435",
    jenisPerwatan: "Pemasangan Crown",
    totalBiaya: 4867071,
    metodePembayaran: "Cash",
    feedback: "Pelayanan ramah",
    sumber: "TikTok",
    riwayatKunjungan: 3,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2022-10-27", total: 4867071, metode: "Cash", status: "Lunas" }
    ]
  },
  {
    id: "PT0002",
    nama: "Fajar Nugroho",
    umur: 34,
    tanggalLahir: "1991-11-26",
    jenisKelamin: "L",
    noHp: "087398950686",
    alamat: "Bangkinang",
    terakhirKunjungan: "2024-11-03",
    status: "Tidak Aktif",
    levelMembership: "Platinum",
    referralCode: "DEN7136",
    jenisPerwatan: "Konsultasi Gigi",
    totalBiaya: 4526087,
    metodePembayaran: "Cash",
    feedback: "Klinik bersih",
    sumber: "WhatsApp",
    riwayatKunjungan: 6,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2024-11-03", total: 4526087, metode: "Cash", status: "Lunas" }
    ]
  },
  {
    id: "PT0003",
    nama: "Ayu Hidayat",
    umur: 11,
    tanggalLahir: "2014-12-06",
    jenisKelamin: "P",
    noHp: "080536880473",
    alamat: "Siak",
    terakhirKunjungan: "2023-12-24",
    status: "Tidak Aktif",
    levelMembership: "Silver",
    referralCode: "DEN3519",
    jenisPerwatan: "Tambal Gigi",
    totalBiaya: 3199387,
    metodePembayaran: "QRIS",
    feedback: "Dokter sangat membantu",
    sumber: "Referral",
    riwayatKunjungan: 13,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2023-12-24", total: 3199387, metode: "QRIS", status: "Lunas" }
    ]
  },
  {
    id: "PT0004",
    nama: "Tiara Lestari",
    umur: 17,
    tanggalLahir: "2008-06-13",
    jenisKelamin: "P",
    noHp: "085116086186",
    alamat: "Bangkinang",
    terakhirKunjungan: "2024-05-11",
    status: "Aktif",
    levelMembership: "Gold",
    referralCode: "DEN5301",
    jenisPerwatan: "Tambal Gigi",
    totalBiaya: 4430876,
    metodePembayaran: "E-wallet",
    feedback: "Klinik bersih",
    sumber: "Instagram",
    riwayatKunjungan: 2,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2024-05-11", total: 4430876, metode: "E-wallet", status: "Lunas" }
    ]
  },
  {
    id: "PT0005",
    nama: "Agus Rahma",
    umur: 9,
    tanggalLahir: "2016-12-29",
    jenisKelamin: "L",
    noHp: "084246528581",
    alamat: "Pekanbaru",
    terakhirKunjungan: "2025-11-04",
    status: "Aktif",
    levelMembership: "Platinum",
    referralCode: "DEN8080",
    jenisPerwatan: "Pemutihan Gigi",
    totalBiaya: 4659181,
    metodePembayaran: "QRIS",
    feedback: "Klinik bersih",
    sumber: "Website",
    riwayatKunjungan: 5,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2025-11-04", total: 4659181, metode: "QRIS", status: "Lunas" }
    ]
  },
  {
    id: "PT0006",
    nama: "Rizky Putri",
    umur: 23,
    tanggalLahir: "2003-03-08",
    jenisKelamin: "L",
    noHp: "081853951483",
    alamat: "Rengat",
    terakhirKunjungan: "2028-01-04",
    status: "Aktif",
    levelMembership: "Gold",
    referralCode: "DEN5334",
    jenisPerwatan: "Konsultasi Gigi",
    totalBiaya: 4345331,
    metodePembayaran: "E-wallet",
    feedback: "Sangat puas",
    sumber: "Referral",
    riwayatKunjungan: 2,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2028-01-04", total: 4345331, metode: "E-wallet", status: "Lunas" }
    ]
  },
  {
    id: "PT0007",
    nama: "Budi Maulana",
    umur: 31,
    tanggalLahir: "1995-04-21",
    jenisKelamin: "L",
    noHp: "087760497563",
    alamat: "Pekanbaru",
    terakhirKunjungan: "2028-02-16",
    status: "Aktif",
    levelMembership: "Regular",
    referralCode: "DEN9101",
    jenisPerwatan: "Pemasangan Crown",
    totalBiaya: 1286203,
    metodePembayaran: "Cash",
    feedback: "Klinik bersih",
    sumber: "Referral",
    riwayatKunjungan: 19,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2028-02-16", total: 1286203, metode: "Cash", status: "Lunas" }
    ]
  },
  {
    id: "PT0008",
    nama: "Putri Hidayat",
    umur: 12,
    tanggalLahir: "2013-10-22",
    jenisKelamin: "P",
    noHp: "086842865141",
    alamat: "Rengat",
    terakhirKunjungan: "2024-02-05",
    status: "Tidak Aktif",
    levelMembership: "Gold",
    referralCode: "DEN1899",
    jenisPerwatan: "Scaling Gigi",
    totalBiaya: 3628985,
    metodePembayaran: "E-wallet",
    feedback: "Pelayanan ramah",
    sumber: "Website",
    riwayatKunjungan: 2,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2024-02-05", total: 3628985, metode: "E-wallet", status: "Lunas" }
    ]
  },
  {
    id: "PT0009",
    nama: "Citra Maulana",
    umur: 34,
    tanggalLahir: "1991-02-22",
    jenisKelamin: "P",
    noHp: "080210672780",
    alamat: "Duri",
    terakhirKunjungan: "2028-06-05",
    status: "Tidak Aktif",
    levelMembership: "Silver",
    referralCode: "DEN6338",
    jenisPerwatan: "Pembersihan Karang Gigi",
    totalBiaya: 2978456,
    metodePembayaran: "E-wallet",
    feedback: "Sangat puas",
    sumber: "Referral",
    riwayatKunjungan: 8,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2028-06-05", total: 2978456, metode: "E-wallet", status: "Lunas" }
    ]
  },
  {
    id: "PT0010",
    nama: "Putri Santoso",
    umur: 33,
    tanggalLahir: "1992-10-14",
    jenisKelamin: "P",
    noHp: "089072304828",
    alamat: "Duri",
    terakhirKunjungan: "2025-04-12",
    status: "Aktif",
    levelMembership: "Gold",
    referralCode: "DEN9189",
    jenisPerwatan: "Pemutihan Gigi",
    totalBiaya: 514118,
    metodePembayaran: "Transfer Bank",
    feedback: "Pelayanan ramah",
    sumber: "WhatsApp",
    riwayatKunjungan: 8,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2025-04-12", total: 514118, metode: "Transfer Bank", status: "Lunas" }
    ]
  },
  {
    id: "PT0011",
    nama: "Ilham Nugroho",
    umur: 10,
    tanggalLahir: "2015-07-04",
    jenisKelamin: "L",
    noHp: "088527233303",
    alamat: "Rengat",
    terakhirKunjungan: "2025-02-20",
    status: "Aktif",
    levelMembership: "Regular",
    referralCode: "DEN7613",
    jenisPerwatan: "Pemutihan Gigi",
    totalBiaya: 3807531,
    metodePembayaran: "QRIS",
    feedback: "Sangat puas",
    sumber: "Website",
    riwayatKunjungan: 1,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2025-02-20", total: 3807531, metode: "QRIS", status: "Lunas" }
    ]
  },
  {
    id: "PT0012",
    nama: "Nabila Lestari",
    umur: 15,
    tanggalLahir: "2010-02-04",
    jenisKelamin: "P",
    noHp: "085273638668",
    alamat: "Duri",
    terakhirKunjungan: "2027-06-06",
    status: "Aktif",
    levelMembership: "Platinum",
    referralCode: "DEN2262",
    jenisPerwatan: "Pemasangan Crown",
    totalBiaya: 367821,
    metodePembayaran: "Transfer Bank",
    feedback: "Puas",
    sumber: "Website",
    riwayatKunjungan: 2,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2027-06-06", total: 367821, metode: "Transfer Bank", status: "Lunas" }
    ]
  },
  {
    id: "PT0013",
    nama: "Anisa Maulana",
    umur: 22,
    tanggalLahir: "2003-05-13",
    jenisKelamin: "P",
    noHp: "080181951362",
    alamat: "Bangkinang",
    terakhirKunjungan: "2025-08-07",
    status: "Tidak Aktif",
    levelMembership: "Silver",
    referralCode: "DEN8785",
    jenisPerwatan: "Behel Gigi",
    totalBiaya: 3426474,
    metodePembayaran: "Debit",
    feedback: "Pelayanan ramah",
    sumber: "Website",
    riwayatKunjungan: 1,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2025-08-07", total: 3426474, metode: "Debit", status: "Lunas" }
    ]
  },
  {
    id: "PT0014",
    nama: "Putri Nugroho",
    umur: 39,
    tanggalLahir: "1986-10-21",
    jenisKelamin: "P",
    noHp: "085733365210",
    alamat: "Pekanbaru",
    terakhirKunjungan: "2025-03-25",
    status: "Tidak Aktif",
    levelMembership: "Gold",
    referralCode: "DEN7565",
    jenisPerwatan: "Cabut Gigi",
    totalBiaya: 495430,
    metodePembayaran: "Cash",
    feedback: "Pelayanan ramah",
    sumber: "TikTok",
    riwayatKunjungan: 8,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2025-03-25", total: 495430, metode: "Cash", status: "Lunas" }
    ]
  },
  {
    id: "PT0015",
    nama: "Bayu Saputra",
    umur: 5,
    tanggalLahir: "2020-02-18",
    jenisKelamin: "L",
    noHp: "085526094550",
    alamat: "Siak",
    terakhirKunjungan: "2028-08-22",
    status: "Tidak Aktif",
    levelMembership: "Regular",
    referralCode: "DEN5819",
    jenisPerwatan: "Pemutihan Gigi",
    totalBiaya: 4807192,
    metodePembayaran: "Debit",
    feedback: "Cepat ditangani",
    sumber: "Instagram",
    riwayatKunjungan: 13,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2028-08-22", total: 4807192, metode: "Debit", status: "Lunas" }
    ]
  },
  {
    id: "PT0016",
    nama: "Dimas Permata",
    umur: 24,
    tanggalLahir: "2001-07-27",
    jenisKelamin: "L",
    noHp: "080402352129",
    alamat: "Rengat",
    terakhirKunjungan: "2026-09-10",
    status: "Aktif",
    levelMembership: "Gold",
    referralCode: "DEN2986",
    jenisPerwatan: "Cabut Gigi",
    totalBiaya: 3398818,
    metodePembayaran: "Cash",
    feedback: "Dokter sangat membantu",
    sumber: "WhatsApp",
    riwayatKunjungan: 12,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2026-09-10", total: 3398818, metode: "Cash", status: "Lunas" }
    ]
  },
  {
    id: "PT0017",
    nama: "Anisa Putri",
    umur: 16,
    tanggalLahir: "2009-11-19",
    jenisKelamin: "P",
    noHp: "087301191765",
    alamat: "Pekanbaru",
    terakhirKunjungan: "2025-09-05",
    status: "Aktif",
    levelMembership: "Silver",
    referralCode: "DEN7347",
    jenisPerwatan: "Pembersihan Karang Gigi",
    totalBiaya: 2737148,
    metodePembayaran: "Debit",
    feedback: "Tidak ada feedback",
    sumber: "TikTok",
    riwayatKunjungan: 14,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2025-09-05", total: 2737148, metode: "Debit", status: "Lunas" }
    ]
  },
  {
    id: "PT0018",
    nama: "Fitri Wijaya",
    umur: 8,
    tanggalLahir: "2017-02-22",
    jenisKelamin: "P",
    noHp: "086490834498",
    alamat: "Bangkinang",
    terakhirKunjungan: "2024-01-29",
    status: "Tidak Aktif",
    levelMembership: "Regular",
    referralCode: "DEN3380",
    jenisPerwatan: "Tambal Gigi",
    totalBiaya: 4922760,
    metodePembayaran: "Debit",
    feedback: "Cepat ditangani",
    sumber: "TikTok",
    riwayatKunjungan: 10,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2024-01-29", total: 4922760, metode: "Debit", status: "Lunas" }
    ]
  },
  {
    id: "PT0019",
    nama: "Ilham Saputra",
    umur: 5,
    tanggalLahir: "2020-04-04",
    jenisKelamin: "L",
    noHp: "089685131708",
    alamat: "Dumai",
    terakhirKunjungan: "2024-11-14",
    status: "Tidak Aktif",
    levelMembership: "Regular",
    referralCode: "DEN4411",
    jenisPerwatan: "Behel Gigi",
    totalBiaya: 3511472,
    metodePembayaran: "E-wallet",
    feedback: "Tidak ada feedback",
    sumber: "Referral",
    riwayatKunjungan: 5,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2024-11-14", total: 3511472, metode: "E-wallet", status: "Lunas" }
    ]
  },
  {
    id: "PT0020",
    nama: "Ilham Nugroho",
    umur: 15,
    tanggalLahir: "2010-07-08",
    jenisKelamin: "L",
    noHp: "082945864462",
    alamat: "Pelalawan",
    terakhirKunjungan: "2023-01-27",
    status: "Aktif",
    levelMembership: "Regular",
    referralCode: "DEN3359",
    jenisPerwatan: "Behel Gigi",
    totalBiaya: 1427053,
    metodePembayaran: "Debit",
    feedback: "Cepat ditangani",
    sumber: "Website",
    riwayatKunjungan: 15,
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2023-01-27", total: 1427053, metode: "Debit", status: "Lunas" }
    ]
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: "JT-001",
    pasienId: "PS-001",
    pasienNama: "Andi Pratama",
    dokterNama: "drg. Fikri (Umum)",
    tanggal: new Date().toISOString().split('T')[0], // Today
    jam: "10:00",
    layanan: "Scaling Gigi",
    keluhan: "Gigi terasa kasar dan gusi berdarah saat sikat gigi.",
    status: "Menunggu"
  },
  {
    id: "JT-002",
    pasienId: "PS-002",
    pasienNama: "Siti Rahayu",
    dokterNama: "drg. Andi (Konservasi Gigi)",
    tanggal: new Date().toISOString().split('T')[0], // Today
    jam: "11:00",
    layanan: "Tambal Komposit",
    keluhan: "Gigi geraham belakang berlubang.",
    status: "Selesai"
  },
  {
    id: "JT-003",
    pasienId: "PS-003",
    pasienNama: "Bapak Wijaya",
    dokterNama: "drg. Siti (Bedah Mulut)",
    tanggal: "2026-05-25",
    jam: "14:00",
    layanan: "Odontektomi",
    keluhan: "Gigi bungsu sakit.",
    status: "Dibatalkan"
  }
];

const ClinicContext = createContext();

export function ClinicProvider({ children }) {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);

  return (
    <ClinicContext.Provider value={{ patients, setPatients, appointments, setAppointments, doctors, setDoctors }}>
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  return useContext(ClinicContext);
}
