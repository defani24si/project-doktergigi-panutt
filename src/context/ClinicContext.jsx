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
    id: "PS-001",
    nama: "Andi Pratama",
    umur: 25,
    tanggalLahir: "1999-05-10",
    jenisKelamin: "L",
    noHp: "081234567890",
    alamat: "Pekanbaru",
    terakhirKunjungan: "2026-05-20",
    status: "Aktif",
    riwayatMedis: [
      { id: 1, tanggal: "2026-05-20", keluhan: "Gigi ngilu saat minum dingin", diagnosis: "Karies Dentis", tindakan: "Tambal Komposit", dokter: "Drg. Fikri" }
    ],
    riwayatJanji: [
      { id: 1, tanggal: "2026-06-20", jam: "10:00", dokter: "Drg. Fikri", status: "Terjadwal" }
    ],
    riwayatPembayaran: [
      { id: 1, tanggal: "2026-05-20", total: 350000, metode: "Transfer Bank", status: "Lunas" }
    ]
  },
  {
    id: "PS-002",
    nama: "Siti Rahayu",
    umur: 30,
    tanggalLahir: "1994-08-15",
    jenisKelamin: "P",
    noHp: "081345678901",
    alamat: "Kampar",
    terakhirKunjungan: "2026-05-01",
    status: "Baru",
    riwayatMedis: [
      { id: 1, tanggal: "2026-05-01", keluhan: "Gusi sering berdarah", diagnosis: "Gingivitis", tindakan: "Scaling", dokter: "Drg. Anisa" }
    ],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2026-05-01", total: 200000, metode: "Tunai", status: "Lunas" }
    ]
  },
  {
    id: "PS-003",
    nama: "Bapak Wijaya",
    umur: 45,
    tanggalLahir: "1979-02-20",
    jenisKelamin: "L",
    noHp: "085234567890",
    alamat: "Dumai",
    terakhirKunjungan: "2026-04-15",
    status: "VIP",
    riwayatMedis: [
      { id: 1, tanggal: "2026-04-15", keluhan: "Gigi bungsu sakit", diagnosis: "Impaksi", tindakan: "Odontektomi", dokter: "Drg. Fikri" }
    ],
    riwayatJanji: [],
    riwayatPembayaran: [
      { id: 1, tanggal: "2026-04-15", total: 1500000, metode: "Transfer Bank", status: "Lunas" }
    ]
  },
  {
    id: "PS-004",
    nama: "Dewi Kusuma",
    umur: 28,
    tanggalLahir: "1998-10-12",
    jenisKelamin: "P",
    noHp: "08122334455",
    alamat: "Siak",
    terakhirKunjungan: "2026-05-22",
    status: "Aktif",
    riwayatMedis: [],
    riwayatJanji: [],
    riwayatPembayaran: []
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
