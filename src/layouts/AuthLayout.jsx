import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <img src="/img/logo1.png" alt="Panutt Dental" className="h-16" />
                </div>

                <Outlet/>

                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2025 Panutt Dental Clinic System. All rights
                    reserved.
                </p>
            </div>
        </div>
    )
}
