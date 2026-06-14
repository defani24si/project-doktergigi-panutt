import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaTooth, FaBars, FaTimes } from "react-icons/fa";

export default function GuestNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive ? "text-[#f06b6b]" : "text-gray-600 hover:text-[#f06b6b]"}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/guest" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f06b6b" }}>
            <FaTooth className="text-white text-base" />
          </div>
          <div>
            <p className="font-bold text-gray-800 leading-tight text-sm">Panutt</p>
            <p className="text-xs text-gray-400 leading-tight">Dental Clinic</p>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/guest" end className={linkClass}>Beranda</NavLink>
          <NavLink to="/guest/layanan" className={linkClass}>Layanan & Dokter</NavLink>
          <NavLink to="/guest/booking" className={linkClass}>Buat Janji</NavLink>
          <NavLink to="/guest/cek-status" className={linkClass}>Cek Status</NavLink>
        </div>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#f06b6b] transition">
            Masuk Admin
          </Link>
          <Link to="/guest/booking"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#f06b6b" }}>
            Buat Janji
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 text-sm font-medium text-gray-700">
          <NavLink to="/guest" end className={linkClass} onClick={() => setMenuOpen(false)}>Beranda</NavLink>
          <NavLink to="/guest/layanan" className={({ isActive }) => `block ${isActive ? "text-[#f06b6b]" : "hover:text-[#f06b6b]"}`} onClick={() => setMenuOpen(false)}>Layanan & Dokter</NavLink>
          <NavLink to="/guest/booking" className={({ isActive }) => `block ${isActive ? "text-[#f06b6b]" : "hover:text-[#f06b6b]"}`} onClick={() => setMenuOpen(false)}>Buat Janji</NavLink>
          <NavLink to="/guest/cek-status" className={({ isActive }) => `block ${isActive ? "text-[#f06b6b]" : "hover:text-[#f06b6b]"}`} onClick={() => setMenuOpen(false)}>Cek Status</NavLink>
          <Link to="/login" className="block text-gray-500 hover:text-[#f06b6b]" onClick={() => setMenuOpen(false)}>Masuk Admin</Link>
        </div>
      )}
    </nav>
  );
}
