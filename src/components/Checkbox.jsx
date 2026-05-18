// Checkbox — sesuai Figma: kotak kecil dengan 3 state (unchecked, checked, indeterminate)
export default function Checkbox({ label, checked = false, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 accent-[#f06b6b] cursor-pointer"
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
