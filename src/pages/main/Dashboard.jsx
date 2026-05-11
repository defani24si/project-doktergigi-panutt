import { FaUsers, FaCalendarCheck, FaTooth } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";

export default function Dashboard() {
  const { patients, appointments } = useClinic();

  const totalPasien = patients.length;
  const totalJanjiSelesai = appointments.filter((a) => a.status === "Selesai").length;
  const totalKasusMendesak = appointments.filter(
    (a) => a.layanan.includes("Cabut") || a.layanan.includes("Odontektomi")
  ).length;

  // Kunjungan terakhir (3 data terbaru)
  const recentAppointments = [...appointments].reverse().slice(0, 3);

  const statusStyle = (status) => {
    switch (status) {
      case "Selesai":
        return "text-green-500 font-semibold";
      case "Menunggu":
        return "text-yellow-500 font-semibold";
      case "Dibatalkan":
        return "text-red-400 font-semibold";
      default:
        return "text-gray-500 font-semibold";
    }
  };

  return (
    <div className="p-2">
      {/* Greeting */}
      <div className="px-4 pt-2 pb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Welcome back, Panutt Admin! 👋
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          We are on a mission to help you manage Panutt Dental Clinic easily and
          beautifully.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 mt-2">
        {/* Total Pasien */}
        <div className="flex items-center gap-5 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <div className="bg-blue-500 rounded-full p-4 text-white text-2xl flex-shrink-0">
            <FaUsers />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800 leading-none">
              {totalPasien}
            </p>
            <p className="text-gray-400 text-sm mt-1">Total Pasien</p>
          </div>
        </div>

        {/* Janji Temu Selesai */}
        <div className="flex items-center gap-5 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <div className="bg-indigo-500 rounded-full p-4 text-white text-2xl flex-shrink-0">
            <FaCalendarCheck />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800 leading-none">
              {totalJanjiSelesai}
            </p>
            <p className="text-gray-400 text-sm mt-1">Janji Temu Selesai</p>
          </div>
        </div>

        {/* Kasus Mendesak */}
        <div className="flex items-center gap-5 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <div
            className="rounded-full p-4 text-white text-2xl flex-shrink-0"
            style={{ backgroundColor: "#f06b6b" }}
          >
            <FaTooth />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800 leading-none">
              {totalKasusMendesak}
            </p>
            <p className="text-gray-400 text-sm mt-1">Kasus Mendesak</p>
          </div>
        </div>
      </div>

      {/* Kunjungan Terakhir Table */}
      <div className="mx-4 mt-6 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-gray-800">Kunjungan Terakhir</h3>
          <Link
            to="/janji-temu"
            className="text-sm font-semibold hover:underline"
            style={{ color: "#f06b6b" }}
          >
            Lihat Semua
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="pb-4 font-medium pr-8">ID Pasien</th>
                <th className="pb-4 font-medium pr-8">Layanan / Tindakan</th>
                <th className="pb-4 font-medium pr-8">Nama Pasien</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {recentAppointments.map((appt, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-bold text-gray-700 pr-8">{appt.id}</td>
                  <td className="py-4 pr-8">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaTooth className="text-blue-500 flex-shrink-0" />
                      {appt.layanan}
                    </div>
                  </td>
                  <td className="py-4 text-gray-600 pr-8">{appt.pasienNama}</td>
                  <td className={`py-4 ${statusStyle(appt.status)}`}>
                    {appt.status}
                  </td>
                </tr>
              ))}
              {recentAppointments.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-gray-400 text-sm"
                  >
                    Belum ada data kunjungan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}