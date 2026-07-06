import {
  FaUserFriends, FaUserMd, FaSignOutAlt,
  FaCalendarAlt, FaTag, FaStar,
  FaTimes, FaExclamationTriangle, FaCog, FaQuestionCircle,
  FaChevronLeft, FaChevronRight, FaFileInvoiceDollar, FaNotesMedical,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar({ collapsed, onToggle, onMobileClose }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem("user");
      if (u) setCurrentUser(JSON.parse(u));
    } catch {}
  }, []);

  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "AD";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl font-medium transition-all w-full text-left
    ${collapsed ? "justify-center px-0 py-3" : "px-4 py-3 space-x-3"}
    ${isActive ? "bg-white text-red-500 shadow-sm" : "text-white hover:bg-white hover:bg-opacity-20"}`;

  const MENU_ITEMS = [
    { to: "/admin",              icon: <MdSpaceDashboard className="text-xl flex-shrink-0" />, label: "Dashboard",         end: true },
    { to: "/pasien",             icon: <FaUserFriends    className="text-xl flex-shrink-0" />, label: "Pasien" },
    { to: "/dokter",             icon: <FaUserMd         className="text-xl flex-shrink-0" />, label: "Dokter" },
    { to: "/janji-temu",         icon: <FaCalendarAlt    className="text-xl flex-shrink-0" />, label: "Janji Temu" },
    { to: "/transaksi",          icon: <FaFileInvoiceDollar className="text-xl flex-shrink-0" />, label: "Transaksi" },
    { to: "/catatan-kesehatan",  icon: <FaNotesMedical      className="text-xl flex-shrink-0" />, label: "Catatan Kesehatan" },
    { to: "/feedback",           icon: <FaStar           className="text-xl flex-shrink-0" />, label: "Feedback & Rating" },
    { to: "/diskon",             icon: <FaTag            className="text-xl flex-shrink-0" />, label: "Diskon & Promo" },
    { to: "/settings",           icon: <FaCog            className="text-xl flex-shrink-0" />, label: "Settings" },
    { to: "/help",               icon: <FaQuestionCircle className="text-xl flex-shrink-0" />, label: "Help" },
    // { to: "/error/400",          icon: <FaExclamationTriangle className="text-xl flex-shrink-0 text-yellow-200" />, label: "Error 400" },
    // { to: "/error/401",          icon: <FaExclamationTriangle className="text-xl flex-shrink-0 text-orange-200" />, label: "Error 401" },
    // { to: "/error/403",          icon: <FaExclamationTriangle className="text-xl flex-shrink-0 text-red-200"    />, label: "Error 403" },
  ];

  return (
    <div
      className={`h-full flex flex-col shadow-lg transition-all duration-300 ${collapsed ? "w-[68px] p-3" : "w-64 p-6"}`}
      style={{ backgroundColor: "#f06b6b", minHeight: "100vh" }}
    >
      {/* ── LOGO ── */}
      <div className={`flex items-center mb-5 mt-2 ${collapsed ? "justify-center" : "gap-3 px-1"}`}>
        {!collapsed && (
          <>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <path d="M20 6 C14 6 10 10 10 15 C10 18 11 20 12 22 C13 25 13 30 15 33 C16 35 17 35 18 33 C19 31 19 28 20 28 C21 28 21 31 22 33 C23 35 24 35 25 33 C27 30 27 25 28 22 C29 20 30 18 30 15 C30 10 26 6 20 6Z" fill="white" opacity="0.95" />
                <path d="M16 9 C14 10 12 12 12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg leading-tight tracking-wide">Panutt</p>
              <p className="text-white/70 text-xs leading-tight">Admin Area</p>
            </div>
            {/* Mobile close */}
            <button className="md:hidden text-white/70 hover:text-white" onClick={onMobileClose}>
              <FaTimes />
            </button>
          </>
        )}

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggle}
          title={collapsed ? "Expand" : "Collapse"}
          className={`hidden md:flex w-7 h-7 rounded-full items-center justify-center text-white hover:bg-white/20 transition flex-shrink-0 ${!collapsed && "ml-auto"}`}
        >
          {collapsed ? <FaChevronRight className="text-xs" /> : <FaChevronLeft className="text-xs" />}
        </button>
      </div>

      {/* ── PROFILE CARD ── */}
      {!collapsed ? (
        <div className="mx-1 mb-5 rounded-2xl p-3 flex items-center gap-3"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl border-2 border-white/40 flex items-center justify-center font-bold text-sm text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
              {getInitials(currentUser?.full_name)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-white text-sm font-bold truncate leading-tight">
              {currentUser?.full_name || "Admin"}
            </p>
            <p className="text-white/70 text-xs truncate mt-0.5">
              {currentUser?.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : "Admin"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl border-2 border-white/40 flex items-center justify-center font-bold text-xs text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
              {getInitials(currentUser?.full_name)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
          </div>
        </div>
      )}

      {/* ── SECTION LABEL ── */}
      {!collapsed && (
        <p className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Menu Utama</p>
      )}

      {/* ── MENU ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={menuClass}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── LOGOUT ── */}
      <div className="mt-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex cursor-pointer items-center rounded-xl font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all w-full
            ${collapsed ? "justify-center py-3" : "px-4 py-3 space-x-3"}`}
        >
          <FaSignOutAlt className="text-xl flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
