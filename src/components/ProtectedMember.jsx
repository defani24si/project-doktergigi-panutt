import { Navigate } from "react-router-dom";

// Proteksi route member — hanya bisa diakses kalau sudah login dengan role 'member'
export default function ProtectedMember({ children }) {
  const raw = localStorage.getItem("user");

  if (!raw) {
    // Belum login → redirect ke login
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(raw);

  if (user.role !== "member") {
    // Admin tidak boleh masuk halaman member, redirect sesuai role
    return user.role === "admin"
      ? <Navigate to="/" replace />
      : <Navigate to="/login" replace />;
  }

  return children;
}
