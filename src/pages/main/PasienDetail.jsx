import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaArrowLeft,
  FaUserAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaNotesMedical,
  FaVenusMars,
  FaClipboardList,
} from "react-icons/fa";

const BADGE_COLORS = {
  Aktif: "bg-green-100 text-green-700",
  Baru: "bg-blue-100 text-blue-700",
  VIP: "bg-yellow-100 text-yellow-700",
  "Tidak Aktif": "bg-red-100 text-red-700",
};

const STATUS_JANJI = {
  Terjadwal: "bg-blue-100 text-blue-700",
  Selesai: "bg-green-100 text-green-700",
  Dibatalkan: "bg-red-100 text-red-700",
};

export default function PasienDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients } = useClinic();

  const pasien = patients.find((p) => p.id === id);

  if (!pasien) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
        <FaUserAlt className="text-5xl" />
        <p className="text-lg font-medium">Pasien tidak ditemukan.</p>
        <button
          onClick={() => navigate("/pasien")}
          className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition"
        >
          <FaArrowLeft />
          Kembali ke Daftar Pasien
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Back Button & Title */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/pasien")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition mb-4"
        >
          <FaArrowLeft />
          Kembali ke Daftar Pasien
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Detail Pasien</h1>
        <p className="text-sm text-gray-400 mt-1">
          ID:{" "}
          <span className="font-semibold text-gray-600">{pasien.id}</span>
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold flex-shrink-0">
          {pasien.nama.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-800">{pasien.nama}</h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold w-fit mx-auto md:mx-0 ${
                BADGE_COLORS[pasien.status] || BADGE_COLORS["Tidak Aktif"]
              }`}
            >
              {pasien.status}
            </span>
          </div>
          <p className="text-sm text-gray-400">{pasien.umur} Tahun</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-lg flex-shrink-0">
            <FaPhone />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Nomor HP</p>
            <p className="text-sm font-semibold text-gray-800">{pasien.noHp || "-"}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-lg flex-shrink-0">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Tanggal Lahir</p>
            <p className="text-sm font-semibold text-gray-800">
              {pasien.tanggalLahir
                ? new Date(pasien.tanggalLahir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-lg flex-shrink-0">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Alamat</p>
            <p className="text-sm font-semibold text-gray-800">{pasien.alamat || "-"}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 md:col-span-2">
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
      </div>

      {/* Riwayat Medis */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <FaClipboardList className="text-blue-500" />
          <h3 className="text-sm font-bold text-gray-700">Riwayat Medis</h3>
        </div>
        {pasien.riwayatMedis && pasien.riwayatMedis.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3">Tanggal</th>
                  <th className="px-5 py-3">Keluhan</th>
                  <th className="px-5 py-3">Diagnosis</th>
                  <th className="px-5 py-3">Tindakan</th>
                  <th className="px-5 py-3">Dokter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pasien.riwayatMedis.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition">
                    <td className="px-5 py-3 text-gray-600">{item.tanggal}</td>
                    <td className="px-5 py-3 text-gray-700">{item.keluhan}</td>
                    <td className="px-5 py-3 text-gray-700">{item.diagnosis}</td>
                    <td className="px-5 py-3 text-gray-700">{item.tindakan}</td>
                    <td className="px-5 py-3 text-gray-600">{item.dokter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-5 text-sm text-gray-400">Belum ada riwayat medis.</p>
        )}
      </div>

      {/* Riwayat Janji */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <FaCalendarAlt className="text-purple-500" />
          <h3 className="text-sm font-bold text-gray-700">Riwayat Janji Temu</h3>
        </div>
        {pasien.riwayatJanji && pasien.riwayatJanji.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3">Tanggal</th>
                  <th className="px-5 py-3">Jam</th>
                  <th className="px-5 py-3">Dokter</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pasien.riwayatJanji.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/30 transition">
                    <td className="px-5 py-3 text-gray-600">{item.tanggal}</td>
                    <td className="px-5 py-3 text-gray-600">{item.jam}</td>
                    <td className="px-5 py-3 text-gray-700">{item.dokter}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_JANJI[item.status] || "bg-gray-100 text-gray-600"}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-5 text-sm text-gray-400">Belum ada riwayat janji temu.</p>
        )}
      </div>
    </div>
  );
}