// FormField — label di atas, input border tipis, rounded-xl, focus ring merah

export function FormInput({ label, type = "text", placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#f06b6b] focus:border-[#f06b6b] transition"
      />
    </div>
  );
}

export function FormSelect({ label, value, onChange, options = [], required }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        required={required}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white
          focus:outline-none focus:ring-2 focus:ring-[#f06b6b] focus:border-[#f06b6b] transition appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '20px',
        }}
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value ?? opt}>{opt.label ?? opt}</option>
        ))}
      </select>
    </div>
  );
}

export function FormTextArea({ label, placeholder, value, onChange, rows = 3, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#f06b6b] focus:border-[#f06b6b] transition resize-none"
      />
    </div>
  );
}

// Tombol aksi bawah modal dengan garis pemisah
export function ModalActions({ onCancel, submitLabel = "Simpan Data" }) {
  return (
    <div className="border-t border-gray-100 pt-4 flex justify-end gap-3 mt-2">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition"
      >
        Batal
      </button>
      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: "#f06b6b" }}
      >
        {submitLabel}
      </button>
    </div>
  );
}
