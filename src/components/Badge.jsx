// Badge — sesuai Figma: pill kecil untuk status/label
export default function Badge({ children, type = "primary" }) {
  const types = {
    primary:   "bg-[#f06b6b] text-white",
    secondary: "bg-gray-200 text-gray-700",
    success:   "bg-green-500 text-white",
    danger:    "bg-red-500 text-white",
    warning:   "bg-yellow-500 text-white",
    light:     "bg-[#fde8e8] text-[#f06b6b]",
  };

  return (
    <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-medium`}>
      {children}
    </span>
  );
}
