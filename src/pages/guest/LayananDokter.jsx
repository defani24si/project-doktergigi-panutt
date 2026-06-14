import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight, FaSearch } from "react-icons/fa";

const SERVICES = [
  { icon: "🦷", nama: "Konsultasi Gigi", desc: "Pemeriksaan menyeluruh dan konsultasi dengan dokter spesialis untuk mengetahui kondisi gigi Anda.", harga: "Rp 75.000", durasi: "30 menit", kategori: "Umum" },
  { icon: "✨", nama: "Scaling / Pembersihan", desc: "Membersihkan karang gigi secara profesional untuk gigi sehat, nafas segar, dan gusi kuat.", harga: "Rp 150.000", durasi: "45 menit", kategori: "Umum" },
  { icon: "🔧", nama: "Tambal Gigi Komposit", desc: "Penambalan gigi berlubang dengan material komposit berwarna alami, tahan lama dan estetis.", harga: "Rp 200.000", durasi: "60 menit", kategori: "Konservasi" },
  { icon: "😁", nama: "Pemutihan Gigi", desc: "Whitening profesional menggunakan teknologi terkini untuk senyum lebih cerah dan percaya diri.", harga: "Rp 500.000", durasi: "90 menit", kategori: "Estetik" },
  { icon: "🔩", nama: "Kawat Gigi (Behel)", desc: "Behel metal dan ceramic untuk merapikan posisi gigi dan memperbaiki gigitan secara permanen.", harga: "Rp 4.000.000", durasi: "1–2 Tahun", kategori: "Ortodonti" },
  { icon: "⚕️", nama: "Cabut Gigi", desc: "Pencabutan gigi dengan prosedur aman, cepat, dan minim rasa nyeri oleh dokter berpengalaman.", harga: "Rp 100.000", durasi: "30 menit", kategori: "Bedah" },
  { icon: "👑", nama: "Pemasangan Crown", desc: "Mahkota gigi berbahan porselen atau zirconia untuk mengembalikan fungsi dan estetika gigi.", harga: "Rp 1.500.000", durasi: "2x kunjungan", kategori: "Estetik" },
  { icon: "🔬", nama: "Odontektomi", desc: "Operasi pencabutan gigi bungsu yang tumbuh miring, dilakukan oleh dokter bedah mulut.", harga: "Rp 800.000", durasi: "60 menit", kategori: "Bedah" },
];

const DOCTORS = [
  { nama: "drg. Fikri", spesialis: "Dokter Gigi Umum", jadwal: "Senin – Jumat, 08:00 – 16:00", pengalaman: "8 tahun", avatar: "https://avatar.iran.liara.run/public/11", layanan: ["Konsultasi", "Scaling", "Tambal Gigi"] },
  { nama: "drg. Anisa", spesialis: "Periodonti", jadwal: "Selasa – Sabtu, 09:00 – 17:00", pengalaman: "6 tahun", avatar: "https://avatar.iran.liara.run/public/21", layanan: ["Scaling", "Perawatan Gusi"] },
  { nama: "drg. Budi", spesialis: "Ortodonti", jadwal: "Senin – Rabu, 10:00 – 16:00", pengalaman: "10 tahun", avatar: "https://avatar.iran.liara.run/public/12", layanan: ["Kawat Gigi", "Konsultasi Ortodonti"] },
  { nama: "drg. Siti", spesialis: "Bedah Mulut", jadwal: "Kamis – Sabtu, 08:00 – 14:00", pengalaman: "9 tahun", avatar: "https://avatar.iran.liara.run/public/22", layanan: ["Odontektomi", "Cabut Gigi", "Implan"] },
  { nama: "drg. Andi", spesialis: "Konservasi Gigi", jadwal: "Senin – Jumat, 13:00 – 20:00", pengalaman: "7 tahun", avatar: "https://avatar.iran.liara.run/public/13", layanan: ["Tambal Gigi", "Crown", "Veneer"] },
];

const KATEGORI = ["Semua", "Umum", "Estetik", "Ortodonti", "Bedah", "Konservasi"];

export default function LayananDokter() {
  const [tab, setTab] = useState("layanan");
  const [kategori, setKategori] = useState("Semua");
  const [search, setSearch] = useState("");

  const filteredLayanan = SERVICES.filter((s) => {
    const matchKategori = kategori === "Semua" || s.kategori === kategori;
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase());
    return matchKategori && matchSearch;
  });

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center py-12 px-6" style={{ background: "linear-gradient(135deg, #fff5f5, #fff)" }}>
        <p className="text-sm font-semibold text-[#f06b6b] mb-2">Panutt Dental Clinic</p>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Layanan & Tim Dokter</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm">Temukan layanan perawatan gigi terlengkap dan kenali dokter-dokter terbaik kami.</p>
      </div>

      {/* Tab */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex gap-2 bg-gray-100 rounded-2xl p-1 w-fit mx-auto mb-8">
          {["layanan", "dokter"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition capitalize ${tab === t ? "bg-white text-[#f06b6b] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {t === "layanan" ? "Daftar Layanan" : "Tim Dokter"}
            </button>
          ))}
        </div>

        {/* ── LAYANAN ── */}
        {tab === "layanan" && (
          <>
            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {KATEGORI.map((k) => (
                  <button key={k} onClick={() => setKategori(k)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${kategori === k ? "border-[#f06b6b] bg-red-50 text-[#f06b6b]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                    {k}
                  </button>
                ))}
              </div>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari layanan..."
                  className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
              {filteredLayanan.map((s) => (
                <div key={s.nama} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{s.icon}</span>
                    <span className="text-xs font-semibold bg-red-50 text-[#f06b6b] px-2 py-0.5 rounded-full">{s.kategori}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{s.nama}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">Mulai dari</p>
                      <p className="font-bold text-sm" style={{ color: "#f06b6b" }}>{s.harga}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Durasi</p>
                      <p className="text-xs font-semibold text-gray-600">{s.durasi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── DOKTER ── */}
        {tab === "dokter" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-12">
            {DOCTORS.map((d) => (
              <div key={d.nama} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition flex gap-4">
                <div className="relative flex-shrink-0">
                  <img src={d.avatar} alt={d.nama} className="w-16 h-16 rounded-2xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{d.nama}</h3>
                      <p className="text-xs font-semibold" style={{ color: "#f06b6b" }}>{d.spesialis}</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{d.pengalaman}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-400" /> {d.jadwal}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {d.layanan.map((l) => (
                      <span key={l} className="text-xs bg-red-50 text-[#f06b6b] px-2 py-0.5 rounded-full">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center py-10 px-6" style={{ background: "linear-gradient(135deg, #f06b6b, #c73030)" }}>
        <h3 className="text-xl font-bold text-white mb-2">Siap untuk perawatan gigi?</h3>
        <p className="text-white/70 text-sm mb-5">Booking sekarang dan dapatkan konsultasi gratis untuk kunjungan pertama.</p>
        <Link to="/guest/booking"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold text-sm transition hover:opacity-90"
          style={{ color: "#f06b6b" }}>
          <FaCalendarAlt /> Buat Janji Sekarang <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
}
