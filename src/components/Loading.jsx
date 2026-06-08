import { FaTooth } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white gap-5">

      {/* Spinner dengan icon gigi di tengah */}
      <div className="relative flex items-center justify-center">
        {/* Ring luar */}
        <div
          className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "#fde8e8", borderTopColor: "#f06b6b" }}
        />
        {/* Icon gigi di tengah */}
        <div className="absolute">
          <FaTooth className="text-xl" style={{ color: "#f06b6b" }} />
        </div>
      </div>

      {/* Teks */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-semibold" style={{ color: "#f06b6b" }}>
          Panutt Dental Clinic
        </p>
        <p className="text-xs text-gray-400 tracking-widest uppercase">
          Memuat...
        </p>
      </div>

      {/* Dot pulse */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "#f06b6b",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
