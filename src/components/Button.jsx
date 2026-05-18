// Button — sesuai Figma: coral rounded, bisa dengan icon
export default function Button({ children, type = "primary", icon, onClick }) {
  const types = {
    primary:   "bg-[#f06b6b] hover:bg-[#e05555] text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    success:   "bg-green-500 hover:bg-green-600 text-white",
    danger:    "bg-red-500 hover:bg-red-600 text-white",
    warning:   "bg-yellow-500 hover:bg-yellow-600 text-white",
    outline:   "bg-white border border-[#f06b6b] text-[#f06b6b] hover:bg-[#fff0f0]",
  };

  return (
    <button
      onClick={onClick}
      className={`${types[type]} inline-flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
