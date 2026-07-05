import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authServiceSimple } from "../../services/authServiceSimple";

function InputRow({ icon, type, name, value, onChange, placeholder, rightEl, error }) {
  return (
    <div>
      <div className={`relative flex items-center border rounded-lg overflow-hidden transition focus-within:ring-2 focus-within:ring-[#f06b6b]/20 ${error ? "border-red-400" : "border-gray-200 focus-within:border-[#f06b6b]"}`}>
        <span className="pl-3 text-gray-400 text-sm flex-shrink-0">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
        {rightEl && <span className="pr-3 flex-shrink-0">{rightEl}</span>}
      </div>
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.fullName) e.fullName = "Nama lengkap wajib diisi";
    if (!form.email) e.email = "Email wajib diisi";
    if (!form.password) e.password = "Password wajib diisi";
    if (form.password.length < 6) e.password = "Password minimal 6 karakter";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Password tidak cocok";
    if (!agreed) e.terms = "Harus disetujui";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    
    try {
      await authServiceSimple.register(
        form.fullName,
        form.email,
        form.password,
        'member' // default role
      );
      setSuccess(true);
    } catch (err) {
      console.error("Register error:", err);
      setErrors({ general: err.message || "Registrasi gagal, coba lagi" });
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-sm mx-auto text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Pendaftaran Berhasil!</h3>
        <p className="text-sm text-gray-500 mb-6">Akun Anda telah dibuat. Silakan masuk.</p>
        <Link
          to="/login"
          className="inline-block px-6 py-2.5 rounded-lg text-white text-sm font-semibold"
          style={{ backgroundColor: "#f06b6b" }}
        >
          Sign In Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign Up</h2>
      <p className="text-sm text-gray-400 mb-4">Buat akun klinik baru</p>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {errors.general && (
          <div className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {errors.general}
          </div>
        )}
        
        <InputRow
          icon={<FaUser />}
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Enter Full Name"
          error={errors.fullName}
        />

        <InputRow
          icon={<FaEnvelope />}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
          error={errors.email}
        />

        <InputRow
          icon={<FaLock />}
          type={showPass ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
          error={errors.password}
          rightEl={
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 text-xs">
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
        />

        <InputRow
          icon={<FaLock />}
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          error={errors.confirmPassword}
          rightEl={
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600 text-xs">
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
        />

        {/* Terms */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => { setAgreed(e.target.checked); if (errors.terms) setErrors({ ...errors, terms: "" }); }}
              className="w-3.5 h-3.5 accent-[#f06b6b]"
            />
            <span className="text-xs text-gray-500">I agree to all terms</span>
          </label>
          {errors.terms && <p className="text-red-500 text-xs mt-0.5">{errors.terms}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: "#f06b6b" }}
        >
          Register
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold hover:underline" style={{ color: "#f06b6b" }}>
          Sign In
        </Link>
      </p>
    </div>
  );
}
