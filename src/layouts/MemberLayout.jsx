import { Outlet, Navigate } from "react-router-dom";

// Layout khusus member — cek login dulu
export default function MemberLayout() {
  const raw = localStorage.getItem("user");

  if (!raw) return <Navigate to="/login" replace />;

  const user = JSON.parse(raw);
  if (user.role !== "member") {
    return user.role === "admin"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}
