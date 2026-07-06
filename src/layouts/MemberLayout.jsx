import { useState, useEffect } from "react";
import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  FaTooth, FaHistory, FaHeartbeat, FaGift, FaCalendarAlt,
  FaStar, FaSignOutAlt, FaCrown, FaBars, FaTimes,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { userService, transaksiService, catatanKesehatanService, diskonService } from "../services/supabaseService";

function getLoggedInMember() {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return { nama: "Member", email: "", noHp: "" };
    const user = JSON.parse(stored);
    return { nama: user.full_name || "Member", email: user.email || "", noHp: user.phone || "" };
  } catch {
    return { nama: "Member", email: "", noHp: "" };
  }
}

const MENU = [
  { to: "/member/dashboard",   label: "Dashboard",          icon: <MdSpaceDashboard className="text-xl flex-shrink-0" /> },
  { to: "/member/transaksi",   label: "Riwayat Transaksi",  icon: <FaHistory        className="text-xl flex-shrink-0" /> },
  { to: "/member/kesehatan",   label: "Riwayat Kesehatan",  icon: <FaHeartbeat      className="text-xl flex-shrink-0" /> },
  { to: "/member/loyalty",     label: "Loyalty & Promo",    icon: <FaGift           className="text-xl flex-shrink-0" /> },
  { to: "/member/booking",     label: "Booking Janji",      icon: <FaCalendarAlt    className="text-xl flex-shrink-0" /> },
  { to: "/member/feedback",    label: "Feedback & Rating",  icon: <FaStar           className="text-xl flex-shrink-0" /> },
];

export default function MemberLayout() {
  const raw = localStorage.getItem("user");
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDb, setUserDb] = useState(null);
  const [transaksiList, setTransaksiList] = useState([]);
  const [catatanList, setCatatanList] = useState([]);
  const [promoList, setPromoList] = useState([]);

  if (!raw) return <Navigate to="/login" replace />;
  const user = JSON.parse(raw);
  if (user.role !== "member") {
    return user.role === "admin"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/login" replace />;
  }

  const MEMBER = getLoggedInMember();

  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "MB";

  useEffect(() => {
    if (MEMBER.email) {
      userService.getByEmail(MEMBER.email)
        .then((data) => { if (data) setUserDb(data); })
        .catch(() => {});
      transaksiService.getByEmail(MEMBER.email)
        .then(setTransaksiList).catch(() => {});
      catatanKesehatanService.getByEmail(MEMBER.email)
        .then(setCatatanList).catch(() => {});
      diskonService.getAll()
        .then((d) => setPromoList(d.filter(p => p.status === "Aktif"))).catch(() => {});
    }
  }, [MEMBER.email]);

  const totalPoin  = userDb?.total_poin    ?? 0;
  const tierMember = userDb?.membership_tier ?? "Bronze";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all w-full text-left text-sm ${
      isActive ? "bg-white text-red-500 shadow-sm" : "text-white hover:bg-white/20"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 flex flex-col p-6 shadow-lg z-40 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:z-auto md:h-auto md:self-stretch
      `} style={{ backgroundColor: "#f06b6b", minHeight: "100vh" }}>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-5 mt-2 px-1">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path d="M20 6 C14 6 10 10 10 15 C10 18 11 20 12 22 C13 25 13 30 15 33 C16 35 17 35 18 33 C19 31 19 28 20 28 C21 28 21 31 22 33 C23 35 24 35 25 33 C27 30 27 25 28 22 C29 20 30 18 30 15 C30 10 26 6 20 6Z" fill="white" opacity="0.95" />
              <path d="M16 9 C14 10 12 12 12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-lg leading-tight tracking-wide">Panutt</p>
            <p className="text-white/70 text-xs leading-tight">Member Area</p>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Profile Card */}
        <div className="mx-1 mb-5 rounded-2xl p-3 flex items-center gap-3"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl border-2 border-white/40 flex items-center justify-center font-bold text-sm text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
              {getInitials(MEMBER.nama)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-white text-sm font-bold truncate leading-tight">{MEMBER.nama}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <FaCrown className="text-yellow-200 text-xs" />
              <p className="text-white/70 text-xs truncate">{tierMember} • {totalPoin} pts</p>
            </div>
          </div>
        </div>

        {/* Section label */}
        <p className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Menu Utama</p>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {MENU.map((m) => (
              <li key={m.to}>
                <NavLink to={m.to} end className={menuClass} onClick={() => setSidebarOpen(false)}>
                  {m.icon}
                  <span>{m.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
          <button onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-white hover:bg-white/20 transition-all w-full">
            <FaSignOutAlt className="text-xl flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex items-center gap-3">
          <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
            <FaBars size={18} />
          </button>
          <h1 className="text-base font-bold text-gray-800">
            <span style={{ color: "#f06b6b" }}>Member</span> Dashboard
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden sm:block">{MEMBER.email}</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: "#f06b6b" }}>
              {getInitials(MEMBER.nama)}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet context={{ MEMBER, userDb, setUserDb, totalPoin, tierMember, transaksiList, catatanList, promoList }} />
        </div>
      </div>
    </div>
  );
}
