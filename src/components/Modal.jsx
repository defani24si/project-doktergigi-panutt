// Modal — popup konfirmasi sesuai Figma
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Box */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 z-10 max-h-[90vh] flex flex-col">
        {/* Header coral — sesuai Figma */}
        <div className="bg-[#f06b6b] px-6 py-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-white opacity-80 hover:opacity-100 text-2xl leading-none font-bold"
          >
            ×
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
