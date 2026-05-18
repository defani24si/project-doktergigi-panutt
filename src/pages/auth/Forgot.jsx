import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { FaEnvelope } from "react-icons/fa";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
        Lupa Password?
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mereset password Anda.
      </p>

      {submitted ? (
        <div className="space-y-4">
          <Alert type="success">
            ✅ Tautan reset password telah dikirim ke <strong>{email}</strong>
          </Alert>
          <Button type="outline" onClick={() => setSubmitted(false)}>
            Kirim ke email lain
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Alamat Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="anda@contoh.com"
            icon={<FaEnvelope />}
          />
          <Button type="primary">Kirim Tautan Reset</Button>
        </form>
      )}

      <p className="text-sm text-gray-500 text-center mt-6">
        Ingat password?{" "}
        <Link to="/login" className="font-medium hover:underline" style={{ color: "#f06b6b" }}>
          Masuk
        </Link>
      </p>
    </>
  );
}
