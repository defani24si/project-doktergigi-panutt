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
      style={{ backgroundColor: "#f0b6b6" }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-4 mt-2">
        <img
          src="/img/logo1.png"
          alt="Panutt Dental Clinic"
          className="w-40 object-contain drop-shadow-sm"
        />
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
      <div className="mt-4 border-t border-red-400 pt-4">
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