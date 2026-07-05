import { FaBell, FaSearch, FaCommentDots, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ROUTE_TITLES = {
  "/admin":       { label: "Dashboard",         highlight: "Dash",       rest: "board",   breadcrumb: "Overview" },
  "/janji-temu":  { label: "Janji Temu",         highlight: "Janji",      rest: " Temu",   breadcrumb: "Janji Temu" },
  "/pasien":      { label: "Manajemen Pasien",   highlight: "Manajemen",  rest: " Pasien", breadcrumb: "Pasien" },
  "/dokter":      { label: "Manajemen Dokter",   highlight: "Manajemen",  rest: " Dokter", breadcrumb: "Dokter" },
  "/feedback":    { label: "Feedback & Rating",   highlight: "Feedback",   rest: " & Rating", breadcrumb: "Feedback" },
  "/transaksi":   { label: "Manajemen Transaksi",  highlight: "Manajemen",  rest: " Transaksi",        breadcrumb: "Transaksi" },
  "/catatan-kesehatan": { label: "Catatan Kesehatan", highlight: "Catatan",  rest: " Kesehatan",        breadcrumb: "Catatan Kesehatan" },
  "/diskon":      { label: "Diskon & Promo",      highlight: "Diskon",     rest: " & Promo", breadcrumb: "Marketing" },
  "/service-automation": { label: "Service Automation", highlight: "Service", rest: " Automation", breadcrumb: "Marketing" },
  "/member":      { label: "Member Dashboard",   highlight: "Member",     rest: " Dashboard", breadcrumb: "Member" },
  "/error/400":   { label: "Error 400",          highlight: "Error",      rest: " 400",    breadcrumb: "400" },
  "/error/401":   { label: "Error 401",          highlight: "Error",      rest: " 401",    breadcrumb: "401" },
  "/error/403":   { label: "Error 403",          highlight: "Error",      rest: " 403",    breadcrumb: "403" },
};

function getTitle(pathname) {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];
  const prefix = Object.keys(ROUTE_TITLES)
    .filter((k) => k !== "/" && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return prefix ? ROUTE_TITLES[prefix] : { label: "Dashboard", highlight: "Dash", rest: "board", breadcrumb: "Overview" };
}

export default function Header({ onMenuToggle }) {
  const [time, setTime] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const { highlight, rest, breadcrumb } = getTitle(location.pathname);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Get user dari localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, []);

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayName = days[time.getDay()];
  const dateStr = `${String(time.getDate()).padStart(2,"0")}/${String(time.getMonth()+1).padStart(2,"0")}/${time.getFullYear()}`;

  // Get initial dari nama untuk avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const userName = currentUser?.full_name || "Guest";
  const userEmail = currentUser?.email || "guest@example.com";
  const initials = getInitials(userName);

  return (
    <div
      id="header-container"
      className="flex justify-between items-center px-6 py-3 bg-white border-b border-gray-100 shadow-sm"
    >
      {/* Left: Hamburger (mobile) + Dynamic Title + Breadcrumb */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <FaBars size={16} />
          </button>
        )}
        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-bold text-gray-800 leading-tight">
            <span style={{ color: "#f06b6b" }}>{highlight}</span>
            {rest}
          </h1>
          <div className="flex items-center space-x-1 text-xs mt-0.5">
            <span className="text-gray-400">Dashboard</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400">{breadcrumb}</span>
          </div>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="relative w-full max-w-md mx-6">
        <input
          type="text"
          placeholder="Search your task here..."
          className="p-2 pl-4 pr-10 w-full rounded-full outline-none text-sm text-gray-600 placeholder-gray-400 bg-white/90 focus:bg-white transition"
        />
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: "#c73030" }}
        >
          <FaSearch size={12} />
        </button>
      </div>

      {/* Right: Icons + Date */}
      <div className="flex items-center space-x-2">
        {/* Notification */}
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: "#f06b6b" }}
          title="Notifikasi"
        >
          <FaBell size={15} />
        </button>

        {/* Messages */}
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: "#f06b6b" }}
          title="Pesan"
        >
          <FaCommentDots size={15} />
        </button>

        {/* Date */}
        <div className="text-right ml-2 pl-2 border-l border-gray-200">
          <p className="text-xs font-semibold text-gray-700">{dayName}</p>
          <p className="text-xs font-bold" style={{ color: "#f06b6b" }}>{dateStr}</p>
        </div>

        {/* User - Dynamic */}
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-700">{userName}</p>
            <p className="text-[10px] text-gray-400">{userEmail}</p>
          </div>
          {/* Avatar dengan initials */}
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: "#f06b6b" }}
          >
            {initials}
          </div>
        </div>
      </div>
    </div>
  );
}
