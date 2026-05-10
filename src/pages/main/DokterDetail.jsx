import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaArrowLeft,
  FaUserMd,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaStethoscope,
  FaClipboardList,
  FaIdBadge,
} from "react-icons/fa";

const BADGE_COLORS = {
  Aktif: "bg-green-100 text-green-700",
  "Tidak Aktif": "bg-red-100 text-red-700",
};

export default function DokterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useClinic();

  const dokter = doctors.find((d) => d.id === id);

  if (!dokter) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
        <FaUserMd className="text-5xl" />
        <p className="text-lg font-medium">Dokter tidak ditemukan.</p>
        <button
          onClick={() => navigate("/dokter")}
          className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition"
        >
          <FaArrowLeft />
          Kembali ke Daftar Dokter
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Back Button & Title */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dokter")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition mb-4"
        >
          <FaArrowLeft />
          Kembali ke Daftar Dokter
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Detail Dokter</h1>
        <p className="text-sm text-gray-400 mt-1">
          ID:{" "}
          <span className="font-semibold text-gray-600">{dokter.id}</span>
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-4xl font-bold flex-shrink-0">
          {dokter.nama.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-800">{dokter.nama}</h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold w-fit mx-auto md:mx-0 ${
                BADGE_COLORS[dokter.status] || BADGE_COLORS["Tidak Aktif"]
              }`}
            >
              {dokter.status}
            </span>
          </div>
          <p className="text-sm text-gray-400">Spesialis {dokter.spesialis}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* ID */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-shrink-0">
            <FaIdBadge />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">ID Dokter</p>
            <p className="text-sm font-semibold text-gray-800">{dokter.id}</p>
          </div>
        </div>

        {/* Spesialis */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">
            <FaStethoscope />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Spesialis</p>
            <p className="text-sm font-semibold text-gray-800">{dokter.spesialis}</p>
          </div>
        </div>

        {/* No HP */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-lg flex-shrink-0">
            <FaPhone />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Nomor HP</p>
            <p className="text-sm font-semibold text-gray-800">{dokter.noHp || "-"}</p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg flex-shrink-0">
            <FaEnvelope />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Email</p>
            <p className="text-sm font-semibold text-gray-800">{dokter.email || "-"}</p>
          </div>
        </div>

        {/* Jadwal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 md:col-span-2">
          <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-lg flex-shrink-0">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Jadwal Praktik</p>
            <p className="text-sm font-semibold text-gray-800">{dokter.jadwal || "-"}</p>
          </div>
        </div>
      </div>

      {/* Riwayat Pasien */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <FaClipboardList className="text-teal-500" />
          <h3 className="text-sm font-bold text-gray-700">Riwayat Pasien Ditangani</h3>
        </div>

        {dokter.riwayatPasien && dokter.riwayatPasien.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3">No</th>
                  <th className="px-5 py-3">Tanggal</th>
                  <th className="px-5 py-3">Nama Pasien</th>
                  <th className="px-5 py-3">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dokter.riwayatPasien.map((item) => (
                  <tr key={item.id} className="hover:bg-teal-50/30 transition">
                    <td className="px-5 py-3 text-gray-400">{item.id}</td>
                    <td className="px-5 py-3 text-gray-600">{item.tanggal}</td>
                    <td className="px-5 py-3 font-semibold text-gray-800">{item.pasien}</td>
                    <td className="px-5 py-3 text-gray-700">{item.tindakan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-5 text-sm text-gray-400">
            Belum ada riwayat pasien yang ditangani.
          </p>
        )}
      </div>
    </div>
  );
}
