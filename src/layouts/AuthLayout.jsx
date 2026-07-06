import { Outlet, useLocation, Navigate } from "react-router-dom";

// Logo Panutt — sama persis dengan sidebar
function PanuttLogo() {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Icon box */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
        style={{ backgroundColor: "#f06b6b" }}
      >
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          <path
            d="M20 6 C14 6 10 10 10 15 C10 18 11 20 12 22 C13 25 13 30 15 33 C16 35 17 35 18 33 C19 31 19 28 20 28 C21 28 21 31 22 33 C23 35 24 35 25 33 C27 30 27 25 28 22 C29 20 30 18 30 15 C30 10 26 6 20 6Z"
            fill="white"
            opacity="0.95"
          />
          <path
            d="M16 9 C14 10 12 12 12 15"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
      {/* Teks */}
      <div>
        <p className="font-bold text-lg leading-tight tracking-wide" style={{ color: "#f06b6b" }}>Panutt</p>
        <p className="text-gray-400 text-xs leading-tight">Dental Clinic</p>
      </div>
    </div>
  );
}

// Ilustrasi Login — smartphone + checkmark
function IllustrationLogin() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48">
        <rect x="70" y="20" width="100" height="170" rx="16" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        <rect x="80" y="36" width="80" height="120" rx="8" fill="#f9fafb"/>
        <circle cx="120" cy="175" r="7" fill="#e5e7eb"/>
        <circle cx="120" cy="96" r="28" fill="#fde8e8"/>
        <circle cx="120" cy="96" r="20" fill="#f06b6b" opacity="0.9"/>
        <path d="M111 96 l6 6 l12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="85" y="130" width="70" height="16" rx="6" fill="#f06b6b" opacity="0.15"/>
        <rect x="90" y="134" width="30" height="4" rx="2" fill="#f06b6b" opacity="0.5"/>
        {/* Person */}
        <circle cx="195" cy="70" r="18" fill="#fcd9bd"/>
        <path d="M177 150 Q182 118 195 112 Q208 118 213 150" fill="#a78bfa" opacity="0.8"/>
        <path d="M177 130 Q165 124 162 114" stroke="#fcd9bd" strokeWidth="7" strokeLinecap="round"/>
        <path d="M213 130 Q222 122 220 112" stroke="#fcd9bd" strokeWidth="7" strokeLinecap="round"/>
        <path d="M178 70 Q179 52 195 50 Q211 52 212 70 Q206 58 195 60 Q184 58 178 70Z" fill="#4b2e1a"/>
      </svg>
      <div>
        <p className="text-sm font-semibold text-gray-600">Selamat Datang Kembali</p>
        <p className="text-xs text-gray-400 mt-1">Masuk untuk mengelola klinik Anda</p>
      </div>
    </div>
  );
}

// Ilustrasi Register — dokumen + orang
function IllustrationRegister() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48">
        {/* Dokumen stack */}
        <rect x="30" y="40" width="80" height="100" rx="10" fill="#e0f2fe" transform="rotate(-8 30 40)"/>
        <rect x="35" y="38" width="80" height="100" rx="10" fill="#bae6fd" transform="rotate(-3 35 38)"/>
        <rect x="40" y="35" width="80" height="100" rx="10" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
        <rect x="52" y="50" width="56" height="5" rx="2.5" fill="#7dd3fc"/>
        <rect x="52" y="62" width="44" height="4" rx="2" fill="#bae6fd"/>
        <rect x="52" y="72" width="50" height="4" rx="2" fill="#bae6fd"/>
        <rect x="52" y="82" width="38" height="4" rx="2" fill="#bae6fd"/>
        {/* Dokumen merah kecil */}
        <rect x="130" y="25" width="65" height="85" rx="10" fill="#fde8e8" stroke="#fca5a5" strokeWidth="1.5" transform="rotate(6 130 25)"/>
        <rect x="140" y="38" width="44" height="4" rx="2" fill="#fca5a5" transform="rotate(6 140 38)"/>
        <rect x="140" y="48" width="36" height="3" rx="1.5" fill="#fecaca" transform="rotate(6 140 48)"/>
        {/* Orang */}
        <circle cx="175" cy="105" r="22" fill="#fcd9bd"/>
        <path d="M153 185 Q158 150 175 143 Q192 150 197 185" fill="#34d399" opacity="0.85"/>
        <path d="M153 165 Q138 158 134 146" stroke="#fcd9bd" strokeWidth="8" strokeLinecap="round"/>
        <rect x="108" y="132" width="34" height="26" rx="5" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
        <rect x="113" y="139" width="24" height="3" rx="1.5" fill="#7dd3fc"/>
        <rect x="113" y="146" width="18" height="2.5" rx="1.25" fill="#bae6fd"/>
        <path d="M197 165 Q210 158 212 148" stroke="#fcd9bd" strokeWidth="8" strokeLinecap="round"/>
        <path d="M154 105 Q155 83 175 81 Q195 83 196 105 Q189 91 175 93 Q161 91 154 105Z" fill="#3b1f0e"/>
      </svg>
      <div>
        <p className="text-sm font-semibold text-gray-600">Bergabung Sekarang</p>
        <p className="text-xs text-gray-400 mt-1">Daftarkan akun klinik Anda</p>
      </div>
    </div>
  );
}

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isRegister = pathname === "/register";

  // Kalau sudah login → redirect sesuai role, tidak boleh ke login/register lagi
  const raw = localStorage.getItem("user");
  if (raw) {
    try {
      const user = JSON.parse(raw);
      if (user.role === "admin") return <Navigate to="/admin" replace />;
      if (user.role === "member") return <Navigate to="/member/dashboard" replace />;
    } catch {}
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      {/* Background dekorasi — subtle, tidak norak */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #f06b6b, transparent)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #c73030, transparent)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #f06b6b, transparent)" }}
        />
      </div>

      {/* Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden flex min-h-[500px] border border-gray-100">

        {isRegister ? (
          <>
            {/* Ilustrasi kiri */}
            <div className="hidden md:flex w-2/5 flex-col items-center justify-center p-10 bg-gradient-to-br from-slate-50 to-red-50">
              <IllustrationRegister />
            </div>
            {/* Form kanan */}
            <div className="w-full md:w-3/5 p-8 flex flex-col justify-center overflow-y-auto">
              <PanuttLogo />
              <Outlet />
            </div>
          </>
        ) : (
          <>
            {/* Form kiri */}
            <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
              <PanuttLogo />
              <Outlet />
            </div>
            {/* Ilustrasi kanan */}
            <div className="hidden md:flex w-2/5 flex-col items-center justify-center p-10 bg-gradient-to-br from-slate-50 to-red-50">
              <IllustrationLogin />
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs text-gray-400">
        © 2026 Panutt Dental Clinic. All rights reserved.
      </p>
    </div>
  );
}
