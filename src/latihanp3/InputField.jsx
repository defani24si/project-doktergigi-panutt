export default function InputField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      />
    </div>
  );
}