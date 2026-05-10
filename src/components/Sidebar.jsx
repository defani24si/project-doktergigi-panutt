import { FaListUl, FaUserFriends, FaUserMd, FaPlus, FaSignOutAlt, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 font-medium transition-all ${isActive
      ? "text-blue-600 bg-blue-100 font-semibold"
      : "text-gray-500 hover:text-blue-600 hover:bg-blue-100"
    }`;

  const handleLogout = () => {
    alert("Logout berhasil!");
  };

  return (
    <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg z-10">

      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col items-start mb-4">
        <img
          src="/img/logo1.png"
          alt="Panutt Dental Clinic"
          className="w-64 object-contain drop-shadow-sm"
        />
      </div>

      {/* Menu */}
      <div className="mt-6">
        <ul className="space-y-3">

          <li>
            <NavLink to="/" end className={menuClass}>
              <MdSpaceDashboard className="text-xl mr-3" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/janji-temu" className={menuClass}>
              <FaCalendarAlt className="text-xl mr-3" /> Janji Temu
            </NavLink>
          </li>

          <li>
            <NavLink to="/pasien" className={menuClass}>
              <FaUserFriends className="text-xl mr-3" /> Pasien
            </NavLink>
          </li>
          <li>
            <NavLink to="/dokter" className={menuClass}>
              <FaUserMd className="text-xl mr-3" /> Dokter
            </NavLink>
          </li>

          {/* Section */}
          <li className="pt-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Error Pages
            </p>
          </li>

          <li>
            <NavLink to="/error/400" className={menuClass}>
              <FaExclamationTriangle className="text-xl mr-3 text-yellow-500" /> Error 400
            </NavLink>
          </li>

          <li>
            <NavLink to="/error/401" className={menuClass}>
              <FaExclamationTriangle className="text-xl mr-3 text-orange-500" /> Error 401
            </NavLink>
          </li>

          <li>
            <NavLink to="/error/403" className={menuClass}>
              <FaExclamationTriangle className="text-xl mr-3 text-red-500" /> Error 403
            </NavLink>
          </li>

        </ul>
      </div>

      {/* Logout */}
      <div className="mt-6">
        <div
          onClick={handleLogout}
          className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-500 hover:text-red-500 hover:bg-red-100 transition-all"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          Logout
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">

        {/* Card bawah */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-4 rounded-2xl shadow-lg mb-10 flex items-center justify-between relative overflow-hidden">

          <div className="text-white text-sm z-10">
            <p className="w-2/3">
              Kelola menu dengan mudah melalui tombol di bawah!
            </p>

            <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer">
              <span className="text-blue-600 font-semibold flex items-center">
                <FaPlus className="mr-2" /> Tambah Menu
              </span>
            </div>
          </div>

          <img
            src="https://avatar.iran.liara.run/public/28"
            className="w-16 h-16 rounded-full absolute -right-2 bottom-4 opacity-80"
            alt="avatar"
          />
        </div>

        <span className="font-bold text-gray-400 block">
          Panutt Dental Clinic System
        </span>
        <p className="font-light text-gray-400">
          © 2025 All Right Reserved
        </p>

      </div>

    </div>
  );
}