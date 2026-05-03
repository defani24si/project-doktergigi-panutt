export default function SelectField({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative group">
        <select
          value={value}
          onChange={onChange}
          className="appearance-none px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white w-full transition-all duration-300 shadow-sm cursor-pointer hover:border-slate-300"
        >
          <option value="" disabled>-- Pilih Kategori --</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 group-hover:text-indigo-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
        </div>
      </div>
    </div>
  );
}
