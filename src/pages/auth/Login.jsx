import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((res) => {
        if (res.status === 200) navigate("/");
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Login gagal");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="max-w-md mx-auto p-6 rounded-xl shadow-md"
      style={{ backgroundColor: "#f0b6b6" }}
    >
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Masuk</h2>
        <p className="text-sm text-gray-500 mb-6">Silakan masuk ke akun Anda</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              placeholder="Masukkan username"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
              required
            />
          </div>

          <div className="text-right">
            <Link
              to="/forgot"
              className="text-xs text-gray-500 hover:underline"
              style={{ color: "#f06b6b" }}
            >
              Lupa password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
            style={{ backgroundColor: "#f06b6b" }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-medium hover:underline"
            style={{ color: "#f06b6b" }}
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}