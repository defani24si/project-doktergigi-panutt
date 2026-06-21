import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTooth, FaHome, FaHistory, FaHeartbeat, FaGift,
  FaSignOutAlt, FaCrown, FaStar, FaCalendarAlt,
  FaCheckCircle, FaHourglass, FaTag, FaCopy,
  FaBars, FaTimes, FaBell, FaSearch, FaCommentDots,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const MEMBER = {
  nama: "Budi Pasien", email: "budi@email.com", noHp: "081234567890",
  levelMembership: "Gold", poin: 300, bergabung: "2024-01-15",
  avatar: "https://avatar.iran.liara.run/public/13",
};

const TRANSAKSI = [
  { id: "TRX-001", tanggal: "2026-06-10", layanan: "Scaling Gigi", dokter: "drg. Fikri (Umum)", biaya: 150000, status: "Selesai" },
  { id: "TRX-002", tanggal: "2026-06-20", layanan: "Kawat Gigi", dokter: "drg. Budi (Ortodonti)", biaya: 4000000, status: "Proses" },
  { id: "TRX-003", tanggal: "2026-06-22", layanan: "Tambal Komposit", dokter: "drg. Andi (Konservasi)", biaya: 200000, status: "Menunggu" },
  { id: "TRX-004", tanggal: "2026-05-20", layanan: "Konsultasi Gigi", dokter: "drg. Fikri (Umum)", biaya: 75000, status: "Selesai" },
  { id: "TRX-005", tanggal: "2026-03-18", layanan: "Pemutihan Gigi", dokter: "drg. Siti (Bedah Mulut)", biaya: 500000, status: "Selesai" },
];

const RIWAYAT_KESEHATAN = [
  { tanggal: "2026-06-10", tindakan: "Scaling Gigi", dokter: "drg. Fikri", catatan: "Karang gigi sudah dibersihkan. Kontrol 6 bulan lagi.", kondisi: "Baik" },
  { tanggal: "2026-05-20", tindakan: "Tambal Komposit", dokter: "drg. Andi", catatan: "Gigi geraham kiri bawah ditambal. Hindari makanan keras 24 jam.", kondisi: "Perlu Perhatian" },
  { tanggal: "2026-04-05", tindakan: "Konsultasi", dokter: "drg. Fikri", catatan: "Kondisi gigi baik. Disarankan scaling rutin setiap 6 bulan.", kondisi: "Baik" },
];

const PROMOS = [
  { kode: "GIGI10", nama: "Diskon Scaling 10%", diskon: 10, berlaku: "2026-08-31", minPoin: 0 },
  { kode: "NEWMEMBER", nama: "Member Baru 20%", diskon: 20, berlaku: "2026-07-31", minPoin: 0 },
  { kode: "GOLD25", nama: "Gold Member 25%", diskon: 25, berlaku: "2026-12-31", minPoin: 200 },
];

const REWARDS = [
  { nama: "Gratis Konsultasi", poin: 150, desc: "1x konsultasi gratis" },
  { nama: "Diskon 20% Tambal", poin: 200, desc: "Berlaku semua layanan tambal" },
  { nama: "Gratis Scaling", poin: 350, desc: "1x scaling gigi gratis" },
  { nama: "Voucher Rp 100rb", poin: 500, desc: "Untuk semua layanan" },
];

const MC_COLOR = {
  Platinum: "from-purple-500 to-purple-700",
  Gold: "from-yellow-400 to-amber-600",
  Silver: "from-gray-400 to-gray-600",
  Regular: "from-blue-400 to-blue-600",
};

const STATUS_BADGE = {
  Selesai: "bg-green-50 text-green-600 border border-green-200",
  Proses: "bg-blue-50 text-blue-600 border border-blue-200",
  Menunggu: "bg-yellow-50 text-yellow-600 border border-yellow-200",
};

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: <MdSpaceDashboard className="text-xl" /> },
  { id: "transaksi", label: "Riwayat Transaksi", icon: <FaHistory className="text-xl" /> },
  { id: "kesehatan", label: "Riwayat Kesehatan", icon: <FaHeartbeat className="text-xl" /> },
  { id: "loyalty", label: "Loyalty & Promo", icon: <FaGift className="text-xl" /> },
];

export default function MemberPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedKode, setCopiedKode] = useState("");
  const [claimAlert, setClaimAlert] = useState("");
  const [time] = useState(new Date());
  const navigate = useNavigate();

  const mc = MC_COLOR[MEMBER.levelMembership] || MC_COLOR.Regular;
  const totalBiaya = TRANSAKSI.filter(t => t.status === "Selesai").reduce((s, t) => s + t.biaya, 0);
  const transaksiProses = TRANSAKSI.filter(t => t.status === "Proses" || t.status === "Menunggu");
  const transaksiSelesai = TRANSAKSI.filter(t => t.status === "Selesai");

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayName = days[time.getDay()];
  const dateStr = `${String(time.getDate()).padStart(2,"0")}/${String(time.getMonth()+1).padStart(2,"0")}/${time.getFullYear()}`;

  const menuClass = (id) =>
    `flex cursor-pointer items-center rounded-xl px-4 py-3 space-x-3 font-medium transition-all w-full text-left ${
      activeTab === id ? "bg-white text-red-500 shadow-sm" : "text-white hover:bg-white hover:bg-opacity-20"
    }`;

  const handleCopy = (kode) => {
    navigator.clipboard.writeText(kode);
    setCopiedKode(kode);
    setTimeout(() => setCopiedKode(""), 2000);
  };

  const handleKlaim = (reward) => {
    if (MEMBER.poin < reward.poin) {
      setClaimAlert(`❌ Poin tidak mencukupi untuk melakukan klaim. Butuh ${reward.poin} poin, kamu hanya punya ${MEMBER.poin} poin.`);
    } else {
      setClaimAlert(`✅ Berhasil menukar poin dengan "${reward.nama}"!`);
    }
    setTimeout(() => setClaimAlert(""), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ minHeight: "100vh" }}>

      {/* ── SIDEBAR (style sama dengan admin) ── */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className={`fixed top-0 left-0 h-full w-64 flex flex-col p-6 shadow-lg z-40 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto md:h-auto md:self-stretch`}
        style={{ backgroundColor: "#f06b6b", minHeight: "100vh" }}>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 mt-2 px-1">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path d="M20 6 C14 6 10 10 10 15 C10 18 11 20 12 22 C13 25 13 30 15 33 C16 35 17 35 18 33 C19 31 19 28 20 28 C21 28 21 31 22 33 C23 35 24 35 25 33 C27 30 27 25 28 22 C29 20 30 18 30 15 C30 10 26 6 20 6Z" fill="white" opacity="0.95" />
              <path d="M16 9 C14 10 12 12 12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight tracking-wide">Panutt</p>
            <p className="text-white/70 text-xs leading-tight">Member Area</p>
          </div>
          <button className="md:hidden ml-auto text-white/70" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
        </div>

        {/* Member Card mini */}
        <div className="mx-1 mb-5 rounded-2xl p-3 flex items-center gap-3" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
          <div className="relative flex-shrink-0">
            <img src={MEMBER.avatar} alt={MEMBER.nama} className="w-10 h-10 rounded-xl border-2 border-white/40 object-cover" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-white text-sm font-bold truncate leading-tight">{MEMBER.nama}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <FaCrown className="text-yellow-200 text-xs" />
              <p className="text-white/70 text-xs truncate">{MEMBER.levelMembership} • {MEMBER.poin} pts</p>
            </div>
          </div>
        </div>

        {/* Section label */}
        <p className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Menu Utama</p>

        {/* Nav */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {TABS.map(tab => (
              <li key={tab.id}>
                <button onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`flex cursor-pointer items-center rounded-xl px-4 py-3 space-x-3 font-medium transition-all w-full text-left ${
                    activeTab === tab.id ? "bg-white text-red-500 shadow-sm" : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}>
                  <span className="text-xl flex-shrink-0">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.id === "transaksi" && (
                    <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">{TRANSAKSI.length}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
          <button onClick={handleLogout}
            className="flex items-center rounded-xl px-4 py-3 font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all w-full">
            <FaSignOutAlt className="mr-3 text-xl flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* HEADER (style sama dengan admin) */}
        <div className="flex justify-between items-center px-6 py-3 bg-white border-b border-gray-100 shadow-sm">
          {/* Kiri */}
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}><FaBars size={20} /></button>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold text-gray-800 leading-tight">
                <span style={{ color: "#f06b6b" }}>{TABS.find(t => t.id === activeTab)?.label.split(" ")[0]}</span>
                {" "}{TABS.find(t => t.id === activeTab)?.label.split(" ").slice(1).join(" ")}
              </h1>
              <div className="flex items-center space-x-1 text-xs mt-0.5">
                <span className="text-gray-400">Member</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{TABS.find(t => t.id === activeTab)?.label}</span>
              </div>
            </div>
          </div>

          {/* Tengah: Search */}
          <div className="relative w-full max-w-md mx-6 hidden md:block">
            <input type="text" placeholder="Search..."
              className="p-2 pl-4 pr-10 w-full rounded-full outline-none text-sm text-gray-600 placeholder-gray-400 bg-gray-50 focus:bg-white border border-gray-200 transition" />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: "#c73030" }}>
              <FaSearch size={12} />
            </button>
          </div>

          {/* Kanan */}
          <div className="flex items-center space-x-2">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#f06b6b" }}>
              <FaBell size={15} />
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#f06b6b" }}>
              <FaCommentDots size={15} />
            </button>
            <div className="text-right ml-2 pl-2 border-l border-gray-200">
              <p className="text-xs font-semibold text-gray-700">{dayName}</p>
              <p className="text-xs font-bold" style={{ color: "#f06b6b" }}>{dateStr}</p>
            </div>
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-700">{MEMBER.nama}</p>
                <p className="text-[10px] text-gray-400">{MEMBER.levelMembership} Member</p>
              </div>
              <img src={MEMBER.avatar} alt={MEMBER.nama} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-6 overflow-auto">
          {claimAlert && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium border ${claimAlert.startsWith("✅") ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
              {claimAlert}
            </div>
          )}

          {/* ══ DASHBOARD ══ */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Transaksi", value: TRANSAKSI.length, icon: <FaCalendarAlt />, color: "bg-blue-50 text-blue-500" },
                  { label: "Total Pengeluaran", value: `Rp ${totalBiaya.toLocaleString("id-ID")}`, icon: <FaHistory />, color: "bg-green-50 text-green-500" },
                  { label: "Poin Loyalty", value: `${MEMBER.poin} pts`, icon: <FaStar />, color: "bg-yellow-50 text-yellow-500" },
                  { label: "Level Member", value: MEMBER.levelMembership, icon: <FaCrown />, color: "bg-purple-50 text-purple-500" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
                    <p className="text-xs text-gray-500 mb-0.5">{s.label}</p>
                    <p className="font-bold text-gray-800 text-sm">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Member Card */}
              <div className={`rounded-3xl bg-gradient-to-br ${mc} p-6 text-white shadow-lg`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Member Card</p>
                    <p className="font-black text-xl">{MEMBER.nama}</p>
                    <p className="text-white/70 text-sm">{MEMBER.email}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-1"><FaCrown /><span className="font-bold">{MEMBER.levelMembership}</span></div>
                    <p className="text-white/70 text-xs">Bergabung {MEMBER.bergabung}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs">Total Poin</p>
                    <p className="font-black text-2xl flex items-center gap-1"><FaStar className="text-yellow-200" /> {MEMBER.poin}</p>
                  </div>
                  <div className="text-right"><p className="text-white/70 text-xs">No. HP</p><p className="font-semibold text-sm">{MEMBER.noHp}</p></div>
                </div>
              </div>

              {/* Transaksi Belum Selesai */}
              {transaksiProses.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FaHourglass className="text-yellow-500" />
                    <h3 className="font-bold text-gray-800">Transaksi Belum Selesai</h3>
                    <span className="ml-auto text-xs bg-yellow-100 text-yellow-600 font-semibold px-2 py-0.5 rounded-full">{transaksiProses.length} aktif</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-gray-100">
                        {["ID","Layanan","Dokter","Tanggal","Biaya","Status"].map(h => <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}
                      </tr></thead>
                      <tbody>{transaksiProses.map(t => (
                        <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-3 py-3 font-mono text-xs text-gray-500">{t.id}</td>
                          <td className="px-3 py-3 font-semibold text-gray-800">{t.layanan}</td>
                          <td className="px-3 py-3 text-gray-600 text-xs">{t.dokter}</td>
                          <td className="px-3 py-3 text-gray-500 text-xs">{t.tanggal}</td>
                          <td className="px-3 py-3 font-semibold text-gray-800">Rp {t.biaya.toLocaleString("id-ID")}</td>
                          <td className="px-3 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_BADGE[t.status]}`}>{t.status}</span></td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Riwayat Tabel */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Riwayat Transaksi</h3>
                  <button onClick={() => setActiveTab("transaksi")} className="text-xs font-semibold hover:underline" style={{ color: "#f06b6b" }}>Lihat Semua</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100">
                      {["ID","Layanan","Tanggal","Biaya","Status"].map(h => <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}
                    </tr></thead>
                    <tbody>{TRANSAKSI.slice(0,4).map(t => (
                      <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-3 py-3 font-mono text-xs text-gray-500">{t.id}</td>
                        <td className="px-3 py-3 font-semibold text-gray-800">{t.layanan}</td>
                        <td className="px-3 py-3 text-gray-500 text-xs">{t.tanggal}</td>
                        <td className="px-3 py-3 font-semibold text-gray-800">Rp {t.biaya.toLocaleString("id-ID")}</td>
                        <td className="px-3 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_BADGE[t.status]}`}>{t.status}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ RIWAYAT TRANSAKSI ══ */}
          {activeTab === "transaksi" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Transaksi", value: `${TRANSAKSI.length}x`, cls: "bg-blue-50 text-blue-600" },
                  { label: "Selesai", value: `${transaksiSelesai.length}x`, cls: "bg-green-50 text-green-600" },
                  { label: "Dalam Proses", value: `${transaksiProses.length}x`, cls: "bg-yellow-50 text-yellow-600" },
                  { label: "Total Biaya", value: `Rp ${totalBiaya.toLocaleString("id-ID")}`, cls: "bg-red-50 text-[#f06b6b]" },
                ].map(s => (
                  <div key={s.label} className={`rounded-2xl p-4 ${s.cls.split(" ")[0]}`}>
                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                    <p className={`font-black text-lg ${s.cls.split(" ")[1]}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-4">Semua Riwayat Transaksi</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b-2 border-gray-100">
                      {["ID Transaksi","Layanan","Dokter","Tanggal","Biaya","Status"].map(h => (
                        <th key={h} className={`px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${h==="Biaya"?"text-right":"text-left"} ${h==="Status"?"text-center":""}`}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>{TRANSAKSI.map((t,i) => (
                      <tr key={t.id} className={`border-b border-gray-50 hover:bg-gray-50 transition ${i%2===0?"":"bg-gray-50/30"}`}>
                        <td className="px-3 py-3.5 font-mono text-xs text-gray-500 font-semibold">{t.id}</td>
                        <td className="px-3 py-3.5 font-semibold text-gray-800">{t.layanan}</td>
                        <td className="px-3 py-3.5 text-gray-600 text-xs">{t.dokter}</td>
                        <td className="px-3 py-3.5 text-gray-500 text-xs">{t.tanggal}</td>
                        <td className="px-3 py-3.5 font-bold text-gray-800 text-right">Rp {t.biaya.toLocaleString("id-ID")}</td>
                        <td className="px-3 py-3.5 text-center"><span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_BADGE[t.status]}`}>{t.status}</span></td>
                      </tr>
                    ))}</tbody>
                    <tfoot><tr className="border-t-2 border-gray-200">
                      <td colSpan={4} className="px-3 py-3 text-sm font-bold text-gray-700">Total Pengeluaran (Selesai)</td>
                      <td className="px-3 py-3 text-right font-black text-sm" style={{ color: "#f06b6b" }}>Rp {totalBiaya.toLocaleString("id-ID")}</td>
                      <td />
                    </tr></tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ RIWAYAT KESEHATAN ══ */}
          {activeTab === "kesehatan" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-5">Riwayat Perawatan Gigi</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
                <div className="space-y-6">
                  {RIWAYAT_KESEHATAN.map((r, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm"
                        style={{ backgroundColor: r.kondisi === "Baik" ? "#dcfce7" : "#fef9c3" }}>
                        {r.kondisi === "Baik" ? <FaCheckCircle className="text-green-500 text-sm" /> : <FaHourglass className="text-yellow-500 text-sm" />}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{r.tindakan}</p>
                            <p className="text-xs text-gray-500">{r.dokter}</p>
                          </div>
                          <div className="text-right ml-2">
                            <p className="text-xs text-gray-400">{r.tanggal}</p>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${r.kondisi==="Baik"?"bg-green-50 text-green-600":"bg-yellow-50 text-yellow-600"}`}>{r.kondisi}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{r.catatan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ LOYALTY & PROMO ══ */}
          {activeTab === "loyalty" && (
            <div className="space-y-6">
              <div className={`rounded-3xl bg-gradient-to-br ${mc} p-5 text-white shadow-md`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Poin Kamu</p>
                    <p className="text-4xl font-black flex items-center gap-2"><FaStar className="text-yellow-200" /> {MEMBER.poin}</p>
                    <p className="text-white/70 text-xs mt-1">{MEMBER.levelMembership} Member</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs mb-1">Progress ke level berikutnya</p>
                    <div className="w-28 bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: `${Math.min((MEMBER.poin/500)*100,100)}%` }} />
                    </div>
                    <p className="text-white/70 text-xs mt-1">{MEMBER.poin}/500 poin</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-4">Tukar Poin dengan Reward</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {REWARDS.map(r => {
                    const bisa = MEMBER.poin >= r.poin;
                    return (
                      <div key={r.nama} className={`border rounded-2xl p-4 transition ${bisa?"border-green-200 bg-green-50":"border-gray-100 bg-gray-50"}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{r.nama}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                          </div>
                          <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full ml-2">{r.poin} pts</span>
                        </div>
                        <button onClick={() => handleKlaim(r)}
                          className={`w-full py-2 rounded-xl text-xs font-semibold transition mt-1 ${bisa?"text-white hover:opacity-90":"bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
                          style={bisa ? { backgroundColor: "#f06b6b" } : {}}>
                          {bisa ? "Tukar Sekarang" : `Kurang ${r.poin - MEMBER.poin} poin lagi`}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-4">Kode Promo Tersedia</h3>
                <div className="space-y-3">
                  {PROMOS.filter(p => p.minPoin <= MEMBER.poin).map(p => (
                    <div key={p.kode} className="flex items-center justify-between border border-dashed border-red-200 rounded-2xl p-4 bg-red-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f06b6b" }}>
                          <FaTag className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{p.nama}</p>
                          <p className="text-xs text-gray-500">Berlaku hingga {p.berlaku}</p>
                        </div>
                      </div>
                      <div className="text-right ml-3">
                        <p className="font-black text-xl" style={{ color: "#f06b6b" }}>{p.diskon}%</p>
                        <button onClick={() => handleCopy(p.kode)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#f06b6b] transition mt-1">
                          <FaCopy className="text-xs" />
                          <span className="font-mono font-bold">{copiedKode === p.kode ? "✓ Tersalin!" : p.kode}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
