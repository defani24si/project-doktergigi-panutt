export default function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}