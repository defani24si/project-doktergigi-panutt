import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      {" "}
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        {" "}
        {/* Logo */}{" "}
        <div className="flex justify-center mb-6">
          {" "}
          <img
            src="/img/logo1.png"
            alt="Panutt Dental Clinic"
            className="h-14 object-contain"
          />{" "}
        </div>{" "}
        <Outlet />{" "}
      </div>{" "}
    </div>
  );
}
