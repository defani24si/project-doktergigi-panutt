import {
  FaUserFriends,
  FaUserMd,
  FaPlus,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom"

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl px-4 py-3 space-x-3 font-medium transition-all ${
      isActive
        ? "bg-white text-red-500 shadow-sm"
        : "text-white hover:bg-white hover:bg-opacity-20"
    }`;

  const handleLogout = () => {
    alert("Logout berhasil!");
  };

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-64 flex-col p-6 shadow-lg z-10"
      style={{ backgroundColor: "#f06b6b" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 mt-2 px-1">
        {/* Icon box */}
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
          style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
        >
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
            {/* Gigi */}
            <path
              d="M20 6 C14 6 10 10 10 15 C10 18 11 20 12 22 C13 25 13 30 15 33 C16 35 17 35 18 33 C19 31 19 28 20 28 C21 28 21 31 22 33 C23 35 24 35 25 33 C27 30 27 25 28 22 C29 20 30 18 30 15 C30 10 26 6 20 6Z"
              fill="white"
              opacity="0.95"
            />
            {/* Highlight gigi */}
            <path
              d="M16 9 C14 10 12 12 12 15"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div>
        {/* Teks */}
        <div>
          <p className="text-white font-bold text-lg leading-tight tracking-wide">Panutt</p>
          <p className="text-white/70 text-xs leading-tight">Dental Clinic</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-1">
          <li>
            <NavLink to="/" end className={menuClass}>
              <MdSpaceDashboard className="text-xl flex-shrink-0" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/janji-temu" className={menuClass}>
              <FaCalendarAlt className="text-xl flex-shrink-0" />
              <span>Janji Temu</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/pasien" className={menuClass}>
              <FaUserFriends className="text-xl flex-shrink-0" />
              <span>Pasien</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/dokter" className={menuClass}>
              <FaUserMd className="text-xl flex-shrink-0" />
              <span>Dokter</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/CobaFiturXYZ" className={menuClass}>
              <FaUserFriends className="text-xl flex-shrink-0" />
              <span>Fitur XYZ</span>
            </NavLink>
          </li>
          {/* Section divider */}
          <li className="pt-3">
            <p className="px-4 text-xs font-semibold text-red-200 uppercase tracking-wider mb-1">
              Error Pages
            </p>
          </li>

          <li>
            <NavLink to="/error/400" className={menuClass}>
              <FaExclamationTriangle className="text-xl flex-shrink-0 text-yellow-200" />
              <span>Error 400</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/error/401" className={menuClass}>
              <FaExclamationTriangle className="text-xl flex-shrink-0 text-orange-200" />
              <span>Error 401</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/error/403" className={menuClass}>
              <FaExclamationTriangle className="text-xl flex-shrink-0 text-red-200" />
              <span>Error 403</span>
            </NavLink>
          </li>

          {/* Section divider */}
          <li className="pt-3">
            <p className="px-4 text-xs font-semibold text-red-200 uppercase tracking-wider mb-1">
              Lainnya
            </p>
          </li>

          <li>
            <NavLink to="/settings" className={menuClass}>
              <FaCog className="text-xl flex-shrink-0" />
              <span>Settings</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/help" className={menuClass}>
              <FaQuestionCircle className="text-xl flex-shrink-0" />
              <span>Help</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="mt-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
        <div
          onClick={handleLogout}
          className="flex cursor-pointer items-center rounded-xl px-4 py-3 font-medium text-white hover:bg-white hover:bg-opacity-20 transition-all"
        >
          <FaSignOutAlt className="mr-3 text-xl flex-shrink-0" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}