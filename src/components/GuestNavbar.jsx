import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaTooth, FaBars, FaTimes } from "react-icons/fa";

// Menu route (pakai NavLink)
const MENU_ROUTES = [
  { to: "/guest", label: "Beranda", end: true },
  { to: "/guest/layanan", label: "Layanan & Dokter" },
  { to: "/guest/booking", label: "Buat Janji" },
];

// Menu anchor (pakai <a> biasa, hanya di landing page)
const MENU_ANCHORS = [
  { href: "#layanan", label: "Harga" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#kontak", label: "Kontak" },
];

export default function GuestNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const staticClass = "px-4 py-2 rounded-full text-sm font-semibold transition text-white/90 hover:bg-white/15 hover:text-white";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md" style={{ backgroundColor: "#f06b6b" }}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/guest" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/20">
            <FaTooth className="text-white text-base" />
          </div>
          <div>
            <p className="font-bold text-white leading-tight text-sm">Panutt</p>
            <p className="text-xs text-white/70 leading-tight">Dental Clinic</p>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {MENU_ROUTES.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.end} className={staticClass}>
              {m.label}
            </NavLink>
          ))}
          {MENU_ANCHORS.map((m) => (
            <a key={m.href} href={`/guest${m.href}`} className={staticClass}>
              {m.label}
            </a>
          ))}
        </div>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-white/90 hover:text-white transition">
            Login
          </Link>
          <Link to="/login"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-[#f06b6b] transition hover:opacity-90">
            Pesan Sekarang
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/20 px-6 py-4 space-y-2" style={{ backgroundColor: "#f06b6b" }}>
          {MENU_ROUTES.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.end}
              className={staticClass}
              onClick={() => setMenuOpen(false)}>
              {m.label}
            </NavLink>
          ))}
          {MENU_ANCHORS.map((m) => (
            <a key={m.href} href={`/guest${m.href}`}
              className={staticClass}
              onClick={() => setMenuOpen(false)}>
              {m.label}
            </a>
          ))}
          <Link to="/login"
            className="block text-center px-4 py-2 rounded-full bg-white text-[#f06b6b] font-semibold text-sm"
            onClick={() => setMenuOpen(false)}>
            Pesan Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
}
