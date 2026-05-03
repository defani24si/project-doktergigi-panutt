import { useState } from "react";
import { FaUsers, FaCalendarCheck, FaTooth, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import PageHeader from "../../components/PageHeader";

export default function Dashboard() {
  const { patients, appointments } = useClinic();

  // Hitung Statistik
  const totalPasien = patients.length;
  const totalJanjiSelesai = appointments.filter(a => a.status === "Selesai").length;
  
  // Kasus mendesak: misal layanan Cabut Gigi atau Odontektomi
  const totalKasusMendesak = appointments.filter(a => 
    a.layanan.includes("Cabut") || a.layanan.includes("Odontektomi")
  ).length;


  // Kunjungan Terakhir (4 data terakhir)
  const recentAppointments = [...appointments].reverse().slice(0, 4);

  return (
    <div id="dashboard-container" className="p-2">
      
      {/* Header + Filter */}
      <div className="flex justify-between items-center pr-5">
        <PageHeader title="Dashboard" breadcrumb="Overview" />

      </div>

      {/* CARD GRID */}
      <div className="p-5 grid sm:grid-cols-1 md:grid-cols-3 gap-6">

        <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <div className="bg-blue-500 rounded-full p-4 text-3xl text-white">
            <FaUsers />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalPasien}</p>
            <p className="text-gray-400 text-sm">Total Pasien</p>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <div className="bg-indigo-500 rounded-full p-4 text-3xl text-white">
            <FaCalendarCheck />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalJanjiSelesai}</p>
            <p className="text-gray-400 text-sm">Janji Temu Selesai</p>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <div className="bg-red-400 rounded-full p-4 text-3xl text-white opacity-80">
            <FaTooth />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalKasusMendesak}</p>
            <p className="text-gray-400 text-sm">Kasus Mendesak</p>
          </div>
        </div>


      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="mx-5 mt-2 p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Kunjungan Terakhir</h3>
          <Link to="/janji-temu" className="text-blue-600 font-bold text-sm hover:text-blue-700 hover:underline">
            Lihat Semua
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-50">
                <th className="pb-4 font-medium">ID Pasien</th>
                <th className="pb-4 font-medium">Layanan / Tindakan</th>
                <th className="pb-4 font-medium">Nama Pasien</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {recentAppointments.map((appointment, index) => {
                const color = appointment.status === 'Selesai' ? 'text-green-600' : appointment.status === 'Menunggu' ? 'text-yellow-500' : 'text-red-400';
                return (
                <tr
                  key={index}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 font-bold text-gray-700">{appointment.id}</td>

                  <td className="py-4 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <FaTooth />
                    </div>
                    {appointment.layanan}
                  </td>

                  <td className="py-4 text-gray-600">{appointment.pasienNama}</td>

                  <td className={`py-4 font-bold ${color}`}>
                    {appointment.status}
                  </td>
                </tr>
              )})}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}