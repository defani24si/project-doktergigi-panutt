import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  // desktop: sidebar visible by default
  // mobile: sidebar hidden by default
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div id="app-container" className="flex min-h-screen bg-gray-50">

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — mobile: overlay, desktop: push */}
      <div className={`
        fixed top-0 left-0 h-full z-40 transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:z-auto md:h-auto md:self-stretch
        ${desktopCollapsed ? "md:w-[68px]" : "md:w-64"}
        transition-all
      `}>
        <Sidebar
          collapsed={desktopCollapsed}
          onToggle={() => setDesktopCollapsed((v) => !v)}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>

      <div id="main-content" className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header onMenuToggle={() => setMobileOpen((v) => !v)} />
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
