// NavButton — sesuai Figma: tombol sidebar dengan icon + teks, coral rounded
// Contoh: Dashboard, My Task, Logout, Help, Settings, dll
export default function NavButton({ children, icon }) {
  return (
    <button className="w-full bg-[#f06b6b] hover:bg-[#e05555] text-white px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-3 transition">
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </button>
  );
}
