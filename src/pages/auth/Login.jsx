import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { FaUser, FaLock } from "react-icons/fa";

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
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Masuk</h2>
      <p className="text-sm text-gray-500 mb-6">Silakan masuk ke akun Anda</p>

      {error && (
        <div className="mb-4">
          <Alert type="danger" onClose={() => setError("")}>
            {error}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Username"
          type="text"
          name="email"
          value={dataForm.email}
          onChange={handleChange}
          placeholder="Masukkan username"
          icon={<FaUser />}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={dataForm.password}
          onChange={handleChange}
          placeholder="Masukkan password"
          icon={<FaLock />}
        />

        <div className="text-right">
          <Link to="/forgot" className="text-xs hover:underline" style={{ color: "#f06b6b" }}>
            Lupa password?
          </Link>
        </div>

        <Button type="primary" onClick={handleSubmit}>
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-6">
        Belum punya akun?{" "}
        <Link to="/register" className="font-medium hover:underline" style={{ color: "#f06b6b" }}>
          Daftar
        </Link>
      </p>
    </>
  );
}
