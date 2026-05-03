import { FaThLarge, FaListUl, FaUserFriends, FaPlus, FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom"

export default function Sidebar() {

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 font-medium ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`

  const handleLogout = () => {
    alert("Logout berhasil!");
  };

  return (
    <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
      
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900 font-bold">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400 font-barlow">
          Modern Admin Dashboard
        </span>
      </div>

      {/* Menu */}
      <div className="mt-10">
        <ul className="space-y-3">
           <li>
            <NavLink id="menu-1" to="/" end className={menuClass}>
              <MdSpaceDashboard className="text-xl mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-2" to="/orders" className={menuClass}>
              <FaListUl className="text-xl mr-3" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-3" to="/customers" className={menuClass}>
              <FaUserFriends className="text-xl mr-3" /> Customers
            </NavLink>
          </li>
          <li className="pt-2">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Error Pages</p>
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

      {/* 🔥 LOGOUT (BARU) */}
      <div className="mt-6">
        <div
          onClick={handleLogout}
          className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-red-500 hover:bg-red-100 hover:font-bold transition-all"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          Logout
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <div className="bg-hijau px-4 py-4 rounded-2xl shadow-lg mb-10 flex items-center justify-between relative overflow-hidden">
          <div className="text-white text-sm z-10">
            <p className="w-2/3">Please organize your menus through button below!</p>
            <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer">
              <span className="text-gray-600 font-bold flex items-center">
                <FaPlus className="mr-2" /> Add Menus
              </span>
            </div>
          </div>
          <img 
            src="https://avatar.iran.liara.run/public/28" 
            className="w-16 h-16 rounded-full absolute -right-2 bottom-4 opacity-80" 
          />
        </div>

        <span className="font-bold text-gray-400 block">
          Sedap Restaurant Admin Dashboard
        </span>
        <p className="font-light text-gray-400">
          © 2025 All Right Reserved
        </p>
      </div>

    </div>
  );
}