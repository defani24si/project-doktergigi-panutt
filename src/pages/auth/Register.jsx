import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "Nama depan wajib diisi";
    if (!form.lastName) newErrors.lastName = "Nama belakang wajib diisi";
    if (!form.username) newErrors.username = "Username wajib diisi";
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }
    if (!agreed) newErrors.terms = "Anda harus menyetujui syarat dan ketentuan";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", form);
    }
  };

  const fields = [
    { name: "firstName", label: "Nama Depan", type: "text", placeholder: "Masukkan nama depan" },
    { name: "lastName", label: "Nama Belakang", type: "text", placeholder: "Masukkan nama belakang" },
    { name: "username", label: "Username", type: "text", placeholder: "Pilih username" },
    { name: "email", label: "Email", type: "email", placeholder: "email@contoh.com" },
    { name: "password", label: "Password", type: "password", placeholder: "Buat password" },
    { name: "confirmPassword", label: "Konfirmasi Password", type: "password", placeholder: "Ulangi password" },
  ];

  return (
    <div 
      className="max-w-md mx-auto p-6 rounded-xl shadow-md"
      style={{ backgroundColor: "#f0b6b6" }}
    >
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Daftar</h2>
        <p className="text-sm text-gray-500 mb-6">Buat akun baru Anda</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {f.label}
              </label>
              <input
                type={f.type}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-opacity-50 ${
                  errors[f.name]
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-gray-400 focus:ring-gray-200"
                }`}
              />
              {errors[f.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[f.name]}</p>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (errors.terms) setErrors({ ...errors, terms: "" });
              }}
              className="w-4 h-4 cursor-pointer accent-red-400"
            />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
              Saya setuju dengan syarat dan ketentuan
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs -mt-2">{errors.terms}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#f06b6b" }}
          >
            Daftar
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-medium hover:underline" style={{ color: "#f06b6b" }}>
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}