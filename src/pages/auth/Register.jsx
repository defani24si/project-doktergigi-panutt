import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import Checkbox from "../../components/Checkbox";

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
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
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
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Daftar</h2>
      <p className="text-sm text-gray-500 mb-6">Buat akun baru Anda</p>

      {success && (
        <div className="mb-4">
          <Alert type="success">
            Pendaftaran berhasil! Silakan masuk ke akun Anda.
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((f) => (
          <div key={f.name}>
            <InputField
              label={f.label}
              type={f.type}
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
            />
            {errors[f.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[f.name]}</p>
            )}
          </div>
        ))}

        <div>
          <Checkbox
            label="Saya setuju dengan syarat dan ketentuan"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              if (errors.terms) setErrors({ ...errors, terms: "" });
            }}
          />
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
          )}
        </div>

        <Button type="primary">Daftar</Button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-6">
        Sudah punya akun?{" "}
        <Link to="/login" className="font-medium hover:underline" style={{ color: "#f06b6b" }}>
          Masuk
        </Link>
      </p>
    </>
  );
}
