import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

function InputRow({ icon, type, name, value, onChange, placeholder, rightEl }) {
  return (
    <div className="relative flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#f06b6b] focus-within:ring-2 focus-within:ring-[#f06b6b]/20 transition">
      <span className="pl-3 text-gray-400 text-sm flex-shrink-0">{icon}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
      />
      {rightEl && <span className="pr-3 flex-shrink-0">{rightEl}</span>}
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((res) => { if (res.status === 200) navigate("/"); })
      .catch((err) => setError(err.response?.data?.message || "Login gagal"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign In</h2>
      <p className="text-sm text-gray-400 mb-6">Masuk ke akun klinik Anda</p>

      {error && (
        <div className="mb-4 text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <InputRow
          icon={<FaUser />}
          type="text"
          name="email"
          value={dataForm.email}
          onChange={handleChange}
          placeholder="Enter Username"
        />
        <InputRow
          icon={<FaLock />}
          type={showPassword ? "text" : "password"}
          name="password"
          value={dataForm.password}
          onChange={handleChange}
          placeholder="Enter Password"
          rightEl={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 text-xs">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
        />

        {/* Remember me */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-3.5 h-3.5 accent-[#f06b6b]"
          />
          <span className="text-xs text-gray-500">Remember Me</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          style={{ background: "linear-gradient(90deg, #f06b6b 0%, #c73030 100%)" }}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {/* Social login */}
      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-2">Or, Login with</p>
        <div className="flex gap-2">
          {[
            { icon: <FaFacebook />, color: "#1877f2" },
            { icon: <FaGoogle />, color: "#ea4335" },
            { icon: <FaTwitter />, color: "#1da1f2" },
          ].map(({ icon, color }, i) => (
            <button
              key={i}
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition hover:opacity-80"
              style={{ backgroundColor: color }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold hover:underline" style={{ color: "#f06b6b" }}>
          Create One
        </Link>
      </p>
    </div>
  );
}
