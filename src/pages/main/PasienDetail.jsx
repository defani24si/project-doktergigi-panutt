import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/useClinic";
import { useState, useEffect } from "react";
import {
  FaArrowLeft, FaUserAlt, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
  FaNotesMedical, FaVenusMars, FaClipboardList,
  FaStar, FaRegStar, FaCrown, FaShareAlt,
} from "react-icons/fa";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import { janjiTemuService, catatanKesehatanService } from "../../services/supabaseService";

const STATUS_BADGE = {
  Aktif: "success",
  "Tidak Aktif": "danger",
};

const STATUS_JANJI = {
  Terjadwal: "primary",
  Selesai: "success",
  Dibatalkan: "danger",
};

function StarRating({ value = 0 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        i <= value
          ? <FaStar key={i} className="text-yellow-400 text-sm" />
          : <FaRegStar key={i} className="text-gray-300 text-sm" />
      ))}
    </div>
  );
}

export default function PasienDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients } = useClinic();
  const pasien = patients.find((p) => p.id === id);

  // Riwayat janji temu dari Supabase berdasarkan nama pasien
  const [riwayatJanji, setRiwayatJanji] = useState([]);
  const [loadingJanji, setLoadingJanji] = useState(true);

  // Catatan kesehatan dari Supabase
  const [catatanKesehatan, setCatatanKesehatan] = useState([]);
  const [loadingCatatan, setLoadingCatatan] = useState(true);

  useEffect(() => {
    if (!pasien) return;
    janjiTemuService.getAll()
      .then((data) => {
        const filtered = data.filter(
          (j) => (j.pasienNama === pasien.nama || j.pasien_nama === pasien.nama)
        );
        setRiwayatJanji(filtered);
      })
      .catch((err) => console.error("Gagal load janji temu:", err))
      .finally(() => setLoadingJanji(false));
  }, [pasien?.nama]);

  useEffect(() => {
    if (!pasien) return;
    catatanKesehatanService.getByNama(pasien.nama)
      .then((data) => setCatatanKesehatan(data))
      .catch((err) => console.error("Gagal load catatan:", err))
      .finally(() => setLoadingCatatan(false));
  }, [pasien?.nama]);

  if (!pasien) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
        <FaUserAlt className="text-5xl" />
        <p className="text-lg font-medium">Pasien tidak ditemukan.</p>
        <Button type="primary" icon={<FaArrowLeft />} onClick={() => navigate("/pasien")}>
          Kembali ke Daftar Pasien
        </Button>
      </div>
    );
  }

  // Data dummy komplain & feedback berdasarkan pasien
  const riwayatFeedback = pasien.riwayatFeedback || [
    {
      id: 1,
      tanggal: pasien.terakhirKunjungan || "2024-01-01",
      layanan: pasien.jenisPerwatan || "Konsultasi Gigi",
      rating: 4,
      komentar: pasien.feedback || "Pelayanan cukup baik dan dokter ramah.",
      dokter: "drg. Fikri (Umum)",
    },
  ];

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Page Header */}
      <PageHeader title="Detail Pasien" breadcrumb={["Pasien", pasien.nama]}>
        <Button type="outline" icon={<FaArrowLeft />} onClick={() => navigate("/pasien")}>
          Kembali
        </Button>
      </PageHeader>

      {/* Profile Card */}
      <Card className="mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold flex-shrink-0">
          <Avatar name={pasien.nama} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-800">{pasien.nama}</h2>
            <Badge type={STATUS_BADGE[pasien.status] || "secondary"}>{pasien.status}</Badge>
            {pasien.levelMembership && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600">
                <FaCrown className="text-xs" /> {pasien.levelMembership}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400">{pasien.umur} Tahun • ID: {pasien.id}</p>
          {pasien.sumber && (
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <FaShareAlt className="text-xs" /> Sumber: {pasien.sumber}
            </p>
          )}
        </div>
      </Card>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaVenusMars />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Jenis Kelamin</p>
              <p className="text-sm font-semibold text-gray-800">
                {pasien.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaPhone />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Nomor HP</p>
              <p className="text-sm font-semibold text-gray-800">{pasien.noHp || "-"}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Tanggal Lahir</p>
              <p className="text-sm font-semibold text-gray-800">
                {pasien.tanggalLahir
                  ? new Date(pasien.tanggalLahir).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-lg flex-shrink-0">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Alamat</p>
              <p className="text-sm font-semibold text-gray-800">{pasien.alamat || "-"}</p>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaNotesMedical />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Kunjungan Terakhir</p>
              <p className="text-sm font-semibold text-gray-800">
                {pasien.terakhirKunjungan || "-"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Riwayat Medis — dari janji temu yang Selesai */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <FaClipboardList className="text-blue-500" />
          <h3 className="text-sm font-bold text-gray-700">Riwayat Medis</h3>
          <span className="ml-auto text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
            {riwayatJanji.filter(j => j.status === "Selesai").length} kunjungan
          </span>
        </div>
        {loadingJanji ? (
          <p className="text-sm text-gray-400">Memuat data...</p>
        ) : riwayatJanji.filter(j => j.status === "Selesai").length > 0 ? (
          <Table headers={["Tanggal", "Jam", "Layanan", "Keluhan", "Dokter"]}>
            {riwayatJanji
              .filter(j => j.status === "Selesai")
              .map((item, i) => (
                <tr key={item.uuid || item.id || i} className="hover:bg-blue-50/30 transition text-sm">
                  <td className="px-4 py-3 text-gray-600 text-xs">{item.tanggal}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{item.jam || "-"}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800 text-xs">{item.layanan}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{item.keluhan || "-"}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{item.dokterNama || item.dokter_nama || "-"}</td>
                </tr>
              ))}
          </Table>
        ) : (
          <p className="text-sm text-gray-400">Belum ada riwayat medis.</p>
        )}
      </Card>

      {/* Riwayat Janji Temu — semua janji */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <FaCalendarAlt className="text-purple-500" />
          <h3 className="text-sm font-bold text-gray-700">Riwayat Janji Temu</h3>
          <span className="ml-auto text-xs bg-purple-50 text-purple-600 font-semibold px-2 py-0.5 rounded-full">
            {riwayatJanji.length} janji
          </span>
        </div>
        {loadingJanji ? (
          <p className="text-sm text-gray-400">Memuat data...</p>
        ) : riwayatJanji.length > 0 ? (
          <Table headers={["ID", "Tanggal", "Jam", "Layanan", "Dokter", "Status"]}>
            {riwayatJanji.map((item, i) => (
              <tr key={item.uuid || item.id || i} className="hover:bg-purple-50/30 transition text-sm">
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{item.id || item.janji_id}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{item.tanggal}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{item.jam || "-"}</td>
                <td className="px-4 py-3 text-gray-700 text-xs">{item.layanan}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{item.dokterNama || item.dokter_nama || "-"}</td>
                <td className="px-4 py-3">
                  <Badge type={
                    item.status === "Selesai" ? "success" :
                    item.status === "Menunggu" ? "warning" :
                    item.status === "Dibatalkan" ? "danger" : "secondary"
                  }>{item.status}</Badge>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <p className="text-sm text-gray-400">Belum ada riwayat janji temu.</p>
        )}
      </Card>

      {/* Catatan Kesehatan dari Admin */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <FaNotesMedical className="text-[#f06b6b]" />
          <h3 className="text-sm font-bold text-gray-700">Catatan Kesehatan</h3>
          <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-[#f06b6b]">
            {catatanKesehatan.length} catatan
          </span>
        </div>
        {loadingCatatan ? (
          <p className="text-sm text-gray-400">Memuat data...</p>
        ) : catatanKesehatan.length > 0 ? (
          <div className="space-y-4">
            {catatanKesehatan.map((c) => (
              <div key={c.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{c.tindakan}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
                      <span>📅 {c.tanggal}</span>
                      {c.dokter && <span>👨‍⚕️ {c.dokter}</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge type={
                      c.status === "Selesai" ? "success" :
                      c.status === "Dalam Perawatan" ? "warning" : "primary"
                    }>{c.status}</Badge>
                    {c.biaya > 0 && (
                      <p className="text-xs font-bold mt-1" style={{ color: "#f06b6b" }}>
                        Rp {Number(c.biaya).toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>
                </div>
                {/* Diagnosis & Resep */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Diagnosis</p>
                    <p className="text-sm text-gray-700">{c.diagnosis || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Resep & Catatan</p>
                    <p className="text-sm text-gray-700">{c.resep || "-"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Belum ada catatan kesehatan untuk pasien ini.</p>
        )}
      </Card>

      {/* Feedback & Review */}
      <Card>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <FaStar className="text-yellow-400" />
          <h3 className="text-sm font-bold text-gray-700">Feedback & Review</h3>
          <span className="ml-auto text-xs bg-yellow-50 text-yellow-600 font-semibold px-2 py-0.5 rounded-full">
            {riwayatFeedback.length} ulasan
          </span>
        </div>
        {riwayatFeedback.length > 0 ? (
          <div className="space-y-3">
            {riwayatFeedback.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-xl p-4 hover:bg-yellow-50/20 transition">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-col gap-1">
                    <StarRating value={item.rating} />
                    <span className="text-xs text-gray-500 font-medium">{item.layanan}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{item.tanggal}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2 italic">"{item.komentar}"</p>
                <p className="text-xs text-gray-400">Dokter: {item.dokter}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Belum ada feedback atau review.</p>
        )}
      </Card>
    </div>
  );
}
