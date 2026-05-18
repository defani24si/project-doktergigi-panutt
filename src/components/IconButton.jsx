// IconButton — sesuai Figma: tombol kotak kecil dengan icon saja (notif, kalender)
export default function IconButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-11 h-11 bg-[#f06b6b] hover:bg-[#e05555] text-white rounded-xl flex items-center justify-center text-lg transition"
    >
      {icon}
    </button>
  );
}
