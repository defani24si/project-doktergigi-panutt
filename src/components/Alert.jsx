// Alert — notifikasi dengan warna sesuai tipe
export default function Alert({ children, type = "info", onClose }) {
  const types = {
    info:    "bg-blue-50 border-blue-400 text-blue-700",
    success: "bg-green-50 border-green-400 text-green-700",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-700",
    danger:  "bg-[#fff0f0] border-[#f06b6b] text-[#f06b6b]",
  };

  return (
    <div className={`${types[type]} border-l-4 px-4 py-3 rounded-lg flex items-start justify-between gap-3`}>
      <p className="text-sm">{children}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current opacity-60 hover:opacity-100 font-bold text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
}
