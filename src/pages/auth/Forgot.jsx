import { useState } from "react";
import { Link } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic untuk mengirim reset link
    console.log("Reset password untuk:", email);
    setSubmitted(true);
  };

  return (
    <div 
      className="max-w-md mx-auto p-6 rounded-xl shadow-md"
      style={{ backgroundColor: "#f0b6b6" }}
    >
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Lupa Password?
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mereset password Anda.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
                placeholder="anda@contoh.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "#f06b6b" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e05555")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f06b6b")
              }
            >
              Kirim Tautan Reset
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              ✅ Tautan reset password telah dikirim ke {email}
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              Kirim ke email lain
            </button>
          </div>
        )}

        <p className="text-sm text-gray-500 text-center mt-6">
          Ingat password?{" "}
          <Link to="/login" className="font-medium hover:underline" style={{ color: "#f06b6b" }}>
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}