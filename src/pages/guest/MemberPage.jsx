import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTooth, FaHome, FaHistory, FaHeartbeat, FaGift,
  FaSignOutAlt, FaCrown, FaStar, FaCalendarAlt,
  FaCheckCircle, FaHourglass, FaTag, FaCopy,
  FaBars, FaTimes, FaBell, FaSearch, FaCommentDots, FaUserMd,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { feedbackService, diskonService, dokterService, janjiTemuService, transaksiService, catatanKesehatanService } from "../../services/supabaseService";

const MEMBER_DEFAULT = {
  nama: "Member", email: "member@email.com", noHp: "081234567890",
  levelMembership: "Gold", poin: 300, bergabung: "2024-01-15",
  avatar: "https://avatar.iran.liara.run/public/13",
};

// Ambil data user yang login dari localStorage
function getLoggedInMember() {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return MEMBER_DEFAULT;
    const user = JSON.parse(stored);
    return {
      ...MEMBER_DEFAULT,
      nama: user.full_name || MEMBER_DEFAULT.nama,
      email: user.email || MEMBER_DEFAULT.email,
      noHp: user.phone || MEMBER_DEFAULT.noHp,
    };
  } catch {
    return MEMBER_DEFAULT;
  }
}

const TRANSAKSI = [
  { id: "TRX-001", invoice: "INV-2025-001", tanggal: "20 Jan 2025", layanan: "Scaling Gigi", dokter: "drg. Fikri (Umum)", metode: "Transfer Bank", biaya: 250000, status: "Lunas" },
  { id: "TRX-002", invoice: "INV-2024-128", tanggal: "15 Des 2024", layanan: "Tambal Gigi", dokter: "drg. Andi (Konservasi)", metode: "Cash", biaya: 350000, status: "Lunas" },
  { id: "TRX-003", invoice: "INV-2024-115", tanggal: "10 Nov 2024", layanan: "Konsultasi", dokter: "drg. Fikri (Umum)", metode: "QRIS", biaya: 150000, status: "Lunas" },
  { id: "TRX-004", invoice: "INV-2025-002", tanggal: "25 Jan 2025", layanan: "Whitening", dokter: "drg. Siti (Bedah Mulut)", metode: "Transfer Bank", biaya: 750000, status: "Pending" },
];

const RIWAYAT_KESEHATAN = [
  { tanggal: "20 Januari 2025", tindakan: "Scaling & Pembersihan Karang Gigi", dokter: "Dr. Sarah Putri", diagnosis: "Plak dan karang gigi ringan", resep: "Mouthwash antiseptik, Sikat gigi khusus", biaya: 250000, status: "Selesai" },
  { tanggal: "15 Desember 2024", tindakan: "Tambal Gigi", dokter: "Dr. Ahmad Fauzi", diagnosis: "Karies gigi molar kanan atas", resep: "Paracetamol 500mg, Hindari makanan keras", biaya: 350000, status: "Selesai" },
  { tanggal: "10 November 2024", tindakan: "Konsultasi Pemasangan Behel", dokter: "Dr. Lisa Amelia", diagnosis: "Maloklusi ringan", resep: "X-Ray panoramik (terlampir)", biaya: 150000, status: "Selesai" },
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
  Lunas: "bg-green-50 text-green-600 border border-green-200",
  Proses: "bg-blue-50 text-blue-600 border border-blue-200",
  Pending: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  Menunggu: "bg-yellow-50 text-yellow-600 border border-yellow-200",
};

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: <MdSpaceDashboard className="text-xl" /> },
  { id: "transaksi", label: "Riwayat Transaksi", icon: <FaHistory className="text-xl" /> },
  { id: "kesehatan", label: "Riwayat Kesehatan", icon: <FaHeartbeat className="text-xl" /> },
  { id: "loyalty", label: "Loyalty & Promo", icon: <FaGift className="text-xl" /> },
  { id: "booking", label: "Booking Janji", icon: <FaCalendarAlt className="text-xl" /> },
  { id: "feedback", label: "Feedback & Rating", icon: <FaStar className="text-xl" /> },
];

export default function MemberPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedKode, setCopiedKode] = useState("");
  const [claimAlert, setClaimAlert] = useState("");
  const [time] = useState(new Date());
  const navigate = useNavigate();

  // Data member dari user yang login
  const [MEMBER] = useState(getLoggedInMember());

  // State form feedback
  const [fbRating, setFbRating] = useState(5);
  const [fbLayanan, setFbLayanan] = useState("");
  const [fbKomentar, setFbKomentar] = useState("");
  const [fbAlert, setFbAlert] = useState("");
  const [fbSaving, setFbSaving] = useState(false);

  // Promo aktif dari database (dibuat admin)
  const [promoList, setPromoList] = useState([]);

  useEffect(() => {
    diskonService
      .getAll()
      .then((data) => setPromoList(data.filter((p) => p.status === "Aktif")))
      .catch((err) => console.error("Gagal load promo:", err));
  }, []);

  // Transaksi dari database
  const [transaksiList, setTransaksiList] = useState([]);

  // Catatan kesehatan dari database
  const [catatanList, setCatatanList] = useState([]);

  // State booking janji temu
  const [doctorList, setDoctorList] = useState([]);
  const LAYANAN_LIST = ["Konsultasi", "Scaling Gigi", "Tambal Komposit", "Cabut Gigi", "Odontektomi", "Kawat Gigi"];
  const TIME_SLOTS = Array.from({ length: 9 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);
  const [bookForm, setBookForm] = useState({
    dokterNama: "",
    tanggal: new Date().toISOString().split("T")[0],
    jam: "",
    layanan: "",
    keluhan: "",
    kodePromo: "",
  });
  const [bookAlert, setBookAlert] = useState("");
  const [bookSaving, setBookSaving] = useState(false);
  const [promoValidasi, setPromoValidasi] = useState(null); // null | { valid, pesan, diskon }

  const handleCekPromo = () => {
    const kode = bookForm.kodePromo.trim().toUpperCase();
    if (!kode) {
      setPromoValidasi({ valid: false, pesan: "Masukkan kode promo terlebih dahulu." });
      return;
    }
    const promo = promoList.find((p) => p.kode === kode && p.status === "Aktif");
    if (promo) {
      setPromoValidasi({ valid: true, pesan: `Promo "${promo.nama}" berhasil diterapkan!`, diskon: promo.diskon });
    } else {
      setPromoValidasi({ valid: false, pesan: "Kode promo tidak valid atau sudah tidak aktif." });
    }
  };

  useEffect(() => {
    dokterService
      .getAll()
      .then((data) => setDoctorList(data.filter((d) => d.status === "Aktif")))
      .catch((err) => console.error("Gagal load dokter:", err));
  }, []);

  // Load transaksi berdasarkan email member yang login
  useEffect(() => {
    if (MEMBER.email) {
      transaksiService
        .getByEmail(MEMBER.email)
        .then((data) => setTransaksiList(data))
        .catch((err) => console.error("Gagal load transaksi:", err));
    }
  }, [MEMBER.email]);

  // Load catatan kesehatan berdasarkan email member
  useEffect(() => {
    if (MEMBER.email) {
      catatanKesehatanService
        .getByEmail(MEMBER.email)
        .then((data) => setCatatanList(data))
        .catch((err) => console.error("Gagal load catatan kesehatan:", err));
    }
  }, [MEMBER.email]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookSaving(true);
    try {
      await janjiTemuService.create({
        pasienNama: MEMBER.nama,
        dokterNama: bookForm.dokterNama,
        tanggal: bookForm.tanggal,
        jam: bookForm.jam,
        layanan: bookForm.layanan,
        keluhan: bookForm.keluhan,
        status: "Menunggu",
      });
      setBookAlert("Janji temu berhasil dibuat! Status: Menunggu konfirmasi.");
      setBookForm({
        dokterNama: "",
        tanggal: new Date().toISOString().split("T")[0],
        jam: "",
        layanan: "",
        keluhan: "",
        kodePromo: "",
      });
      setPromoValidasi(null);
    } catch (err) {
      console.error("Gagal booking:", err);
      setBookAlert("Gagal membuat janji temu. Coba lagi.");
    } finally {
      setBookSaving(false);
    }
    setTimeout(() => setBookAlert(""), 4000);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setFbSaving(true);
    try {
      await feedbackService.create({
        nama: MEMBER.nama,
        email: MEMBER.email,
        rating: fbRating,
        layanan: fbLayanan,
        komentar: fbKomentar,
      });
      setFbAlert("Terima kasih! Feedback Anda berhasil dikirim.");
      setFbRating(5);
      setFbLayanan("");
      setFbKomentar("");
    } catch (err) {
      console.error("Gagal kirim feedback:", err);
      setFbAlert("Gagal mengirim feedback. Coba lagi.");
    } finally {
      setFbSaving(false);
    }
    setTimeout(() => setFbAlert(""), 4000);
  };

  const mc = MC_COLOR[MEMBER.levelMembership] || MC_COLOR.Regular;
  // Gunakan transaksiList dari database jika ada, fallback ke TRANSAKSI statis
  const trxData = transaksiList.length > 0 ? transaksiList : TRANSAKSI;
  const totalBiaya = trxData.filter(t => (t.status === "Lunas") || (t.status === "Lunas")).reduce((s, t) => s + Number(t.total || t.biaya || 0), 0);
  const transaksiProses = trxData.filter(t => t.status === "Pending" || t.status === "Proses" || t.status === "Menunggu");
  const transaksiSelesai = trxData.filter(t => t.status === "Lunas" || t.status === "Selesai");

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
                    <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">{trxData.length}</span>
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
                  { label: "Total Transaksi", value: trxData.length, icon: <FaCalendarAlt />, color: "bg-blue-50 text-blue-500" },
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
                      <tbody>{transaksiProses.map((t, i) => {
                          const idVal   = t.trx_id || t.id || `TRX-${i+1}`;
                          const biayaVal = Number(t.total || t.biaya || 0);
                          const dokterVal = t.dokter_nama || t.dokter || "-";
                          return (
                            <tr key={idVal} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="px-3 py-3 font-mono text-xs text-gray-500">{idVal}</td>
                              <td className="px-3 py-3 font-semibold text-gray-800">{t.layanan}</td>
                              <td className="px-3 py-3 text-gray-600 text-xs">{dokterVal}</td>
                              <td className="px-3 py-3 text-gray-500 text-xs">{t.tanggal}</td>
                              <td className="px-3 py-3 font-semibold text-gray-800">Rp {biayaVal.toLocaleString("id-ID")}</td>
                              <td className="px-3 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_BADGE[t.status] || "bg-gray-100 text-gray-500"}`}>{t.status}</span></td>
                            </tr>
                          );
                        })}</tbody>
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
                    <tbody>{trxData.slice(0, 4).map((t, i) => {
                      const idVal     = t.trx_id || t.id || `TRX-${i+1}`;
                      const layanan   = t.layanan || "-";
                      const tanggal   = t.tanggal || "-";
                      const biayaVal  = Number(t.total || t.biaya || 0);
                      const statusVal = t.status || "-";
                      return (
                        <tr key={idVal} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-3 py-3 font-mono text-xs text-gray-500">{idVal}</td>
                          <td className="px-3 py-3 font-semibold text-gray-800">{layanan}</td>
                          <td className="px-3 py-3 text-gray-500 text-xs">{tanggal}</td>
                          <td className="px-3 py-3 font-semibold text-gray-800">Rp {biayaVal.toLocaleString("id-ID")}</td>
                          <td className="px-3 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_BADGE[statusVal] || "bg-gray-100 text-gray-500"}`}>
                              {statusVal}
                            </span>
                          </td>
                        </tr>
                      );
                    })}</tbody>
                  </table>
                  {trxData.length === 0 && (
                    <p className="text-center text-gray-400 text-xs py-4">Belum ada transaksi.</p>
                  )}
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
                  { label: "Lunas", value: `${transaksiSelesai.length}x`, cls: "bg-green-50 text-green-600" },
                  { label: "Pending", value: `${transaksiProses.length}x`, cls: "bg-yellow-50 text-yellow-600" },
                  { label: "Total Biaya", value: `Rp ${totalBiaya.toLocaleString("id-ID")}`, cls: "bg-red-50 text-[#f06b6b]" },
                ].map(s => (
                  <div key={s.label} className={`rounded-2xl p-4 ${s.cls.split(" ")[0]}`}>
                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                    <p className={`font-black text-lg ${s.cls.split(" ")[1]}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Card transaksi */}
              <div className="space-y-3">
                {trxData.map((t, i) => {
                  const isLunas = t.status === "Lunas";
                  const biayaVal = Number(t.total || t.biaya || 0);
                  const invoiceVal = t.invoice || t.id || `TRX-${i + 1}`;
                  const tanggalVal = t.tanggal || t.created_at?.slice(0, 10) || "-";
                  const metodeVal = t.metode_pembayaran || t.metode || "-";
                  const layananVal = t.layanan || "-";
                  const statusVal = t.status || "-";
                  return (
                    <div key={t.id || i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-3">
                      {/* Kiri: ikon + info */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: isLunas ? "#dcfce7" : "#fef9c3" }}
                        >
                          {isLunas
                            ? <FaCheckCircle className="text-green-500" />
                            : <FaHourglass className="text-yellow-500 text-sm" />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{layananVal}</p>
                          <p className="text-xs text-gray-500">{invoiceVal} • {tanggalVal}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">Metode: {metodeVal}</p>
                        </div>
                      </div>

                      {/* Kanan: harga + status + download */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-black text-gray-800">Rp {biayaVal.toLocaleString("id-ID")}</p>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block mt-1 ${
                            isLunas ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                          }`}>
                            {statusVal}
                          </span>
                        </div>
                        <button
                          onClick={() => alert(`Invoice ${invoiceVal} akan diunduh (fitur demo).`)}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition hover:opacity-90 flex-shrink-0"
                          style={{ backgroundColor: "#f06b6b" }}
                          title="Download Invoice"
                        >
                          <FaHistory className="text-sm" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══ RIWAYAT KESEHATAN (RIWAYAT MEDIS) ══ */}
          {activeTab === "kesehatan" && (
            <div className="space-y-5">
              {(catatanList.length > 0 ? catatanList : RIWAYAT_KESEHATAN).map((r, i) => {
                // Normalisasi field dari DB (snake_case) atau dummy (camelCase)
                const tindakan  = r.tindakan || "-";
                const tanggal   = r.tanggal || "-";
                const dokter    = r.dokter || "-";
                const status    = r.status || "Selesai";
                const biaya     = Number(r.biaya || 0);
                const diagnosis = r.diagnosis || "-";
                const resep     = r.resep || "-";

                return (
                  <div key={r.id || i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    {/* Header card */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f06b6b" }}>
                          <FaTooth className="text-white text-lg" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{tindakan}</h3>
                          <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><FaCalendarAlt className="text-gray-400" /> {tanggal}</span>
                            <span className="flex items-center gap-1"><FaUserMd className="text-gray-400" /> {dokter}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-50 text-green-600">{status}</span>
                        <p className="font-black mt-1" style={{ color: "#f06b6b" }}>Rp {biaya.toLocaleString("id-ID")}</p>
                      </div>
                    </div>

                    {/* Detail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Diagnosis</p>
                        <p className="text-sm text-gray-700">{diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Resep & Catatan</p>
                        <p className="text-sm text-gray-700">{resep}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => alert("Invoice akan diunduh (fitur demo).")}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl transition hover:opacity-90"
                        style={{ backgroundColor: "#f06b6b" }}
                      >
                        <FaHistory className="text-xs" /> Download Invoice
                      </button>
                      <button
                        onClick={() => alert(`Tindakan: ${tindakan}\nDokter: ${dokter}\nDiagnosis: ${diagnosis}\nResep: ${resep}`)}
                        className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                );
              })}
              {catatanList.length === 0 && RIWAYAT_KESEHATAN.length === 0 && (
                <p className="text-center text-gray-400 py-8">Belum ada riwayat kesehatan.</p>
              )}
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
                  {promoList.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">Belum ada promo aktif saat ini.</p>
                  ) : (
                    promoList.map(p => (
                      <div key={p.id} className="flex items-center justify-between border border-dashed border-red-200 rounded-2xl p-4 bg-red-50/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f06b6b" }}>
                            <FaTag className="text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{p.nama}</p>
                            <p className="text-xs text-gray-500">
                              Berlaku hingga {p.berlakuHingga || "-"}
                              {p.minBeli > 0 && ` • Min. Rp ${Number(p.minBeli).toLocaleString("id-ID")}`}
                            </p>
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
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══ BOOKING JANJI TEMU ══ */}
          {activeTab === "booking" && (
            <div className="space-y-6 max-w-2xl mx-auto">
              {bookAlert && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
                  {bookAlert}
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-1">Booking Janji Temu</h3>
                <p className="text-sm text-gray-400 mb-5">Buat janji temu dengan dokter pilihan Anda</p>

                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Dokter */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Pilih Dokter</label>
                    <select
                      required
                      value={bookForm.dokterNama}
                      onChange={(e) => setBookForm({ ...bookForm, dokterNama: e.target.value, jam: "" })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] bg-white"
                    >
                      <option value="">-- Pilih Dokter --</option>
                      {doctorList.map((d) => (
                        <option key={d.id} value={d.nama}>{d.nama} - {d.spesialis}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tanggal */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Tanggal Janji</label>
                      <input
                        required
                        type="date"
                        value={bookForm.tanggal}
                        onChange={(e) => setBookForm({ ...bookForm, tanggal: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]"
                      />
                    </div>
                    {/* Jam */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Jam</label>
                      <select
                        required
                        value={bookForm.jam}
                        onChange={(e) => setBookForm({ ...bookForm, jam: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] bg-white"
                      >
                        <option value="">-- Pilih Jam --</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Layanan */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Jenis Layanan</label>
                    <select
                      required
                      value={bookForm.layanan}
                      onChange={(e) => setBookForm({ ...bookForm, layanan: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] bg-white"
                    >
                      <option value="">-- Pilih Layanan --</option>
                      {LAYANAN_LIST.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>

                  {/* Keluhan */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Keluhan</label>
                    <textarea
                      rows={3}
                      value={bookForm.keluhan}
                      onChange={(e) => setBookForm({ ...bookForm, keluhan: e.target.value })}
                      placeholder="Deskripsikan keluhan Anda..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] resize-none"
                    />
                  </div>

                  {/* Kode Promo */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Kode Promo <span className="text-gray-400 font-normal">(opsional)</span></label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={bookForm.kodePromo}
                        onChange={(e) => {
                          setBookForm({ ...bookForm, kodePromo: e.target.value.toUpperCase() });
                          setPromoValidasi(null);
                        }}
                        placeholder="Masukkan kode promo..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#f06b6b]"
                      />
                      <button
                        type="button"
                        onClick={handleCekPromo}
                        className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition hover:opacity-90 flex-shrink-0"
                        style={{ backgroundColor: "#f06b6b" }}
                      >
                        Cek
                      </button>
                    </div>

                    {/* Hasil validasi */}
                    {promoValidasi && (
                      <div className={`mt-2 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                        promoValidasi.valid
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}>
                        <span>{promoValidasi.valid ? "✅" : "❌"}</span>
                        <span>{promoValidasi.pesan}</span>
                        {promoValidasi.valid && (
                          <span className="ml-auto font-bold text-green-700">-{promoValidasi.diskon}%</span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={bookSaving}
                    className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#f06b6b" }}
                  >
                    {bookSaving ? "Memproses..." : "Booking Sekarang"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ══ FEEDBACK & RATING ══ */}
          {activeTab === "feedback" && (
            <div className="space-y-6 max-w-2xl mx-auto">
              {fbAlert && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
                  {fbAlert}
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-1">Beri Feedback & Rating</h3>
                <p className="text-sm text-gray-400 mb-5">Bagikan pengalaman Anda di Panutt Dental Clinic</p>

                <form onSubmit={handleSubmitFeedback} className="space-y-5">
                  {/* Rating bintang */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Rating Anda</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFbRating(i)}
                          className="text-3xl transition focus:outline-none"
                        >
                          <FaStar className={i <= fbRating ? "text-yellow-400" : "text-gray-200"} />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">{fbRating} / 5</span>
                    </div>
                  </div>

                  {/* Layanan */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Layanan yang Dinilai</label>
                    <input
                      type="text"
                      value={fbLayanan}
                      onChange={(e) => setFbLayanan(e.target.value)}
                      placeholder="cth: Scaling Gigi, Konsultasi..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]"
                    />
                  </div>

                  {/* Komentar */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Komentar</label>
                    <textarea
                      required
                      rows={4}
                      value={fbKomentar}
                      onChange={(e) => setFbKomentar(e.target.value)}
                      placeholder="Tuliskan pengalaman atau masukan Anda..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={fbSaving}
                    className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#f06b6b" }}
                  >
                    {fbSaving ? "Mengirim..." : "Kirim Feedback"}
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
