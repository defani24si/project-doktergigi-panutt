import { FaUsers, FaCalendarCheck, FaTooth } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Table from "../../components/Table";
import Alert from "../../components/Alert";
import { useState } from "react";

export default function Dashboard() {
  const { patients, appointments } = useClinic();
  const [showAlert, setShowAlert] = useState(true);

  const totalPasien = patients.length;
  const totalJanjiSelesai = appointments.filter((a) => a.status === "Selesai").length;
  const totalKasusMendesak = appointments.filter(
    (a) => a.layanan.includes("Cabut") || a.layanan.includes("Odontektomi")
  ).length;
  const totalMenunggu = appointments.filter((a) => a.status === "Menunggu").length;

  const recentAppointments = [...appointments].reverse().slice(0, 5);

  const statusBadgeType = (status) => {
    if (status === "Selesai") return "success";
    if (status === "Menunggu") return "warning";
    if (status === "Dibatalkan") return "danger";
    return "secondary";
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Alert info janji menunggu */}
      {showAlert && totalMenunggu > 0 && (
        <div className="px-4 mb-4">
          <Alert type="warning" onClose={() => setShowAlert(false)}>
            Ada <strong>{totalMenunggu}</strong> janji temu yang masih menunggu konfirmasi hari ini.
          </Alert>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 mt-2">
        <Card>
          <div className="flex items-center gap-5">
            <div className="bg-blue-500 rounded-full p-4 text-white text-2xl flex-shrink-0">
              <FaUsers />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800 leading-none">{totalPasien}</p>
              <p className="text-gray-400 text-sm mt-1">Total Pasien</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-5">
            <div className="bg-indigo-500 rounded-full p-4 text-white text-2xl flex-shrink-0">
              <FaCalendarCheck />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800 leading-none">{totalJanjiSelesai}</p>
              <p className="text-gray-400 text-sm mt-1">Janji Temu Selesai</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-5">
            <div className="bg-[#f06b6b] rounded-full p-4 text-white text-2xl flex-shrink-0">
              <FaTooth />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800 leading-none">{totalKasusMendesak}</p>
              <p className="text-gray-400 text-sm mt-1">Kasus Mendesak</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Kunjungan Terakhir */}
      <div className="mx-4 mt-6">
        <Card>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-800">Kunjungan Terakhir</h3>
            <Link to="/janji-temu" className="text-sm font-semibold text-[#f06b6b] hover:underline">
              Lihat Semua
            </Link>
          </div>

          <Table headers={["ID", "Pasien", "Layanan / Tindakan", "Status"]}>
            {recentAppointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">
                  Belum ada data kunjungan.
                </td>
              </tr>
            ) : (
              recentAppointments.map((appt, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors text-sm">
                  <td className="px-4 py-3 font-bold text-gray-700">{appt.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={appt.pasienNama} />
                      <span className="text-gray-700">{appt.pasienNama}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaTooth className="text-[#f06b6b] flex-shrink-0" />
                      {appt.layanan}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge type={statusBadgeType(appt.status)}>{appt.status}</Badge>
                  </td>
                </tr>
              ))
            )}
          </Table>
        </Card>
      </div>
    </div>
  );
}
