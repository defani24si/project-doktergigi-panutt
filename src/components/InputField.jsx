// InputField — sesuai Figma: border tipis, icon di kiri, placeholder abu
export default function InputField({ label, type = "text", placeholder, value, onChange, name, icon, inputRef }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          ref={inputRef}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-gray-300 rounded-lg py-2 text-sm text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#f06b6b] focus:border-transparent transition
            ${icon ? "pl-9 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}
