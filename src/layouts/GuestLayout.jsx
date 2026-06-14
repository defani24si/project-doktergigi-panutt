import { Outlet } from "react-router-dom";
import GuestNavbar from "../components/GuestNavbar";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-white">
      <GuestNavbar />
      <div className="pt-[57px]">
        <Outlet />
      </div>
    </div>
  );
}
