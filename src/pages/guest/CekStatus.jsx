import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTooth, FaSearch, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaHourglass } from "react-icons/fa";

// Data dummy untuk simulasi cek status
const DUMMY_BOOKINGS = [
  { kode: "BK001ABC", nama: "Andi Pratama", noHp: "081234567890", dokter: "drg. Fikri (Umum)", layanan: "Scaling Gigi", tanggal: "2026-06-20", jam: "10:00", status: "Menunggu", catatan: "Harap datang 10 menit sebelum jadwal." },
  { kode: "BK002DEF", nama: "Siti Rahayu", noHp: "082345678901", dokter: "drg. Andi (Konservasi)", layanan: "Tambal Komposit", tanggal: "2026-06-18", jam: "14:00", status: "Selesai", catatan: "Perawatan berhasil dilakukan. Kontrol 1 minggu lagi." },
  { kode: "BK003GHI", nama: "Budi Santoso", noHp: "083456789012", dokter: "drg. Siti (Bedah Mulut)", layanan: "Odontektomi", tanggal: "2026-06-15", jam: "09:00", status: "Dibatalkan", catatan: "Dibatalkan atas permintaan pasien." },
];

const STATUS_CONFIG = {
  Menunggu: { icon: <FaHourglass />, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", label: "Menunggu Konfirmasi" },
  Selesai: { icon: <FaCheckCircle />, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", label: "Selesai" },
  Dikonfirmasi: { icon: <FaCheckCircle />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", label: "Terkonfirmasi" },
  Dibatalkan: { icon: <FaTimesCircle />, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "Dibatalkan" },
};

export default function CekStatus() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    const found = DUMMY_BOOKINGS.find(
      (b) => b.kode.toLowerCase() === input.toLowerCase() || b.noHp === input
    );
    if (found) { setResult(found); setNotFound(false); }
    else { setResult(null); setNotFound(true); }
  };

  const cfg = result ? STATUS_CONFIG[result.status] || STATUS_CONFIG.Menunggu : null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-lg mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#fff5f5" }}>
            <FaSearch className="text-2xl" style={{ color: "#f06b6b" }} />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Cek Status Janji Temu</h1>
          <p className="text-gray-500 text-sm mt-2">Masukkan kode booking atau nomor HP yang Anda daftarkan.</p>
        </div>

        {/* Form Cari */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium text-gray-700">Kode Booking atau Nomor HP</label>
            <input
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="cth: BK001ABC atau 081234567890"
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]"
            />
            <p className="text-xs text-gray-400 mt-1">Kode booking diberikan setelah Anda melakukan booking.</p>
          </div>
          <button type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition hover:opacity-90"
            style={{ backgroundColor: "#f06b6b" }}>
            <FaSearch /> Cari Janji Temu
          </button>
        </form>

        {/* Not Found */}
        {searched && notFound && (
          <div className="bg-white rounded-2xl border border-red-100 p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaTimesCircle className="text-red-400 text-xl" />
            </div>
            <p className="font-semibold text-gray-800 mb-1">Tidak Ditemukan</p>
            <p className="text-sm text-gray-500">Kode booking atau nomor HP tidak terdaftar. Pastikan data yang dimasukkan sudah benar.</p>
          </div>
        )}

        {/* Result */}
        {result && cfg && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Status Banner */}
            <div className={`${cfg.bg} ${cfg.border} border-b px-5 py-4 flex items-center gap-3`}>
              <div className={`text-xl ${cfg.color}`}>{cfg.icon}</div>
              <div>
                <p className="text-xs text-gray-500">Status Janji Temu</p>
                <p className={`font-bold text-sm ${cfg.color}`}>{cfg.label}</p>
              </div>
              <span className="ml-auto text-xs font-mono font-bold text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-200">
                {result.kode}
              </span>
            </div>

            <div className="p-5 space-y-4">
              {/* Info Pasien */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Pasien</p>
                <p className="font-bold text-gray-800">{result.nama}</p>
                <p className="text-sm text-gray-500">{result.noHp}</p>
              </div>

              <hr className="border-gray-100" />

              {/* Info Jadwal */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Detail Jadwal</p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaTooth className="text-[#f06b6b] text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Dokter</p>
                      <p className="text-sm font-semibold text-gray-800">{result.dokter}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-blue-500 text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tanggal & Jam</p>
                      <p className="text-sm font-semibold text-gray-800">{result.tanggal} — {result.jam}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-green-500 text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Layanan</p>
                      <p className="text-sm font-semibold text-gray-800">{result.layanan}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Catatan */}
              {result.catatan && (
                <>
                  <hr className="border-gray-100" />
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Catatan Klinik</p>
                    <p className="text-sm text-gray-600">{result.catatan}</p>
                  </div>
                </>
              )}

              {/* CTA */}
              <div className="flex gap-3 pt-2">
                <Link to="/guest/booking"
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center transition hover:opacity-90 text-white"
                  style={{ backgroundColor: "#f06b6b" }}>
                  Buat Janji Baru
                </Link>
                <button onClick={() => { setResult(null); setInput(""); setSearched(false); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                  Cari Lagi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info demo */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
          <p className="text-xs font-semibold text-blue-700 mb-2">💡 Demo — Coba kode berikut:</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {DUMMY_BOOKINGS.map((b) => (
              <button key={b.kode} onClick={() => setInput(b.kode)}
                className="text-xs font-mono bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition">
                {b.kode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
