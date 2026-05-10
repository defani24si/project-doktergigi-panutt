import { useState, useMemo } from "react";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTimes, FaCalendarAlt, FaListUl, FaCheck, FaBan, FaCalendarDay } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { useClinic } from "../../context/ClinicContext";

const DOKTER_LIST = [
  "drg. Budi (Ortodonti)",
  "drg. Siti (Bedah Mulut)",
  "drg. Andi (Konservasi Gigi)",
  "drg. Fikri (Umum)"
];

// Data List lainnya...

const STATUS_COLORS = {
  Menunggu: "bg-yellow-100 text-yellow-700",
  Selesai: "bg-green-100 text-green-700",
  Dibatalkan: "bg-red-100 text-red-700",
};

const LAYANAN_LIST = [
  "Konsultasi", "Scaling Gigi", "Tambal Komposit", "Cabut Gigi", "Odontektomi", "Kawat Gigi"
];

// Generate time slots (08:00 - 16:00)
const TIME_SLOTS = Array.from({ length: 9 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`);

export default function JanjiTemu() {
  const { appointments, setAppointments, patients } = useClinic();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const [showForm, setShowForm] = useState(false);

  // Form State
  const [form, setForm] = useState({
    pasienId: "",
    dokterNama: "",
    tanggal: new Date().toISOString().split('T')[0],
    jam: "",
    layanan: "",
    keluhan: ""
  });

  // Derived filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchSearch = apt.pasienNama.toLowerCase().includes(searchTerm.toLowerCase()) || apt.dokterNama.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === "Semua" || apt.status === filterStatus;
      const matchDate = filterTanggal === "" || apt.tanggal === filterTanggal;
      return matchSearch && matchStatus && matchDate;
    }).sort((a, b) => {
      if (a.tanggal === b.tanggal) return a.jam.localeCompare(b.jam);
      return a.tanggal.localeCompare(b.tanggal);
    });
  }, [appointments, searchTerm, filterStatus, filterTanggal]);



  // Check available slots
  const getAvailableSlots = (tanggal, dokter) => {
    const bookedSlots = appointments
      .filter(apt => apt.tanggal === tanggal && apt.dokterNama === dokter && apt.status !== "Dibatalkan")
      .map(apt => apt.jam);
    return TIME_SLOTS.map(slot => ({
      time: slot,
      isAvailable: !bookedSlots.includes(slot)
    }));
  };

  const handleSaveJanji = (e) => {
    e.preventDefault();
    const pasien = patients.find(p => p.id === form.pasienId);

    const newApt = {
      id: `JT-${String(appointments.length + 1).padStart(3, "0")}`,
      pasienId: form.pasienId,
      pasienNama: pasien ? pasien.nama : "Unknown",
      dokterNama: form.dokterNama,
      tanggal: form.tanggal,
      jam: form.jam,
      layanan: form.layanan,
      keluhan: form.keluhan,
      status: "Menunggu"
    };

    setAppointments([...appointments, newApt]);
    setShowForm(false);
    setForm({ pasienId: "", dokterNama: "", tanggal: new Date().toISOString().split('T')[0], jam: "", layanan: "", keluhan: "" });
  };

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
  };

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Manajemen Janji Temu" breadcrumb="Jadwal Pasien" />

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between gap-4">

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-56">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Cari pasien / dokter..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter Status */}
          <select
            value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="Semua">Semua Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>

          {/* Filter Tanggal */}
          <input
            type="date" value={filterTanggal} onChange={e => setFilterTanggal(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-gray-600"
          />
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
        >
          <FaPlus />
          <span>Buat Janji</span>
        </button>
      </div>

      {/* LIST VIEW  */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Pasien</th>
                <th className="px-6 py-4">Dokter</th>
                <th className="px-6 py-4">Tgl & Jam</th>
                <th className="px-6 py-4">Layanan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredAppointments.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-400">Tidak ada jadwal ditemukan.</td></tr>
              ) : (
                filteredAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-blue-50/50 transition duration-150">
                    <td className="px-6 py-4 font-medium text-gray-600">{apt.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{apt.pasienNama}</td>
                    <td className="px-6 py-4 text-gray-600">{apt.dokterNama}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex flex-col">
                        <span className="font-medium">{apt.tanggal}</span>
                        <span className="text-xs text-gray-400 flex items-center mt-1"><FaCalendarDay className="mr-1" /> {apt.jam}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{apt.layanan}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[apt.status]}`}>
                        {apt.status === "Menunggu" ? "⏳ Menunggu" : apt.status === "Selesai" ? "✔ Selesai" : "❌ Dibatalkan"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {apt.status === "Menunggu" ? (
                        <select
                          value=""
                          onChange={(e) => {
                            if (e.target.value) updateStatus(apt.id, e.target.value);
                          }}
                          className="px-2 py-1 text-xs font-semibold border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white cursor-pointer text-gray-600 shadow-sm"
                        >
                          <option value="" disabled>Aksi...</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Dibatalkan">Batalkan</option>
                        </select>
                      ) : (
                        <span className="text-gray-400 font-medium">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl my-8">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h2 className="text-lg font-bold text-gray-800">Buat Janji Temu Baru</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveJanji} className="p-6 space-y-5">
              {/* Pasien & Dokter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Pasien</label>
                  <select required value={form.pasienId} onChange={e => setForm({ ...form, pasienId: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="" disabled>-- Cari Pasien --</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.id} - {p.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Dokter</label>
                  <select required value={form.dokterNama} onChange={e => setForm({ ...form, dokterNama: e.target.value, jam: "" })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="" disabled>-- Spesialis --</option>
                    {DOKTER_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Tanggal & Waktu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Janji</label>
                  <input required type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value, jam: "" })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jam (Auto Slot)</label>
                  <select required value={form.jam} onChange={e => setForm({ ...form, jam: e.target.value })} disabled={!form.tanggal || !form.dokterNama}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400">
                    <option value="" disabled>{form.dokterNama ? "-- Pilih Waktu --" : "Pilih dokter & tanggal dulu"}</option>
                    {form.tanggal && form.dokterNama && getAvailableSlots(form.tanggal, form.dokterNama).map(slot => (
                      <option key={slot.time} value={slot.time} disabled={!slot.isAvailable}>
                        {slot.time} {slot.isAvailable ? "" : "(Penuh)"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Layanan & Keluhan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Layanan</label>
                <select required value={form.layanan} onChange={e => setForm({ ...form, layanan: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="" disabled>-- Pilih Tindakan --</option>
                  {LAYANAN_LIST.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keluhan Pasien</label>
                <textarea required rows="3" value={form.keluhan} onChange={e => setForm({ ...form, keluhan: e.target.value })} placeholder="Deskripsikan sakit yang dialami..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition">
                  Batal
                </button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm">
                  Booking Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}
