import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTimes,
  FaUserMd,
  FaStethoscope,
} from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { useClinic } from "../../context/ClinicContext";

const BADGE_COLORS = {
  Aktif: "bg-green-100 text-green-700",
  "Tidak Aktif": "bg-red-100 text-red-700",
};

const EMPTY_FORM = {
  nama: "",
  spesialis: "",
  noHp: "",
  email: "",
  jadwal: "",
  status: "Aktif",
};

export default function Dokter() {
  const { doctors, setDoctors } = useClinic();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEdit, setIsEdit] = useState(false);

  const totalDokter = doctors.length;
  const dokterAktif = doctors.filter((d) => d.status === "Aktif").length;

  const filteredDokter = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch =
        d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.spesialis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
        filterStatus === "Semua" || d.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [doctors, searchTerm, filterStatus]);

  const handleSave = (e) => {
    e.preventDefault();
    if (isEdit) {
      setDoctors(doctors.map((d) => (d.id === form.id ? { ...form } : d)));
    } else {
      const newDokter = {
        ...form,
        id: `DK-${String(doctors.length + 1).padStart(3, "0")}`,
        riwayatPasien: [],
      };
      setDoctors([newDokter, ...doctors]);
    }
    closeForm();
  };

  const openEdit = (d) => {
    setForm(d);
    setIsEdit(true);
    setShowForm(true);
  };

  const closeForm = () => {
    setForm(EMPTY_FORM);
    setIsEdit(false);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Manajemen Dokter" breadcrumb="Daftar Dokter" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center text-xl">
            <FaUserMd />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Dokter</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalDokter}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl">
            <FaStethoscope />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Dokter Aktif</p>
            <h3 className="text-2xl font-bold text-gray-800">{dokterAktif}</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari dokter atau spesialis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-40 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition"
          >
            <option value="Semua">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-teal-700 transition shadow-sm"
        >
          <FaPlus />
          <span>Tambah Dokter</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Profil Dokter</th>
                <th className="px-6 py-4">Spesialis</th>
                <th className="px-6 py-4">No. HP</th>
                <th className="px-6 py-4">Jadwal Praktik</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filteredDokter.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                    Tidak ada data dokter ditemukan.
                  </td>
                </tr>
              ) : (
                filteredDokter.map((d) => (
                  <tr key={d.id} className="hover:bg-teal-50/50 transition duration-150">
                    <td className="px-6 py-4 font-medium text-gray-600">{d.id}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {d.nama.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            to={`/dokter/${d.id}`}
                            className="font-semibold text-gray-800 hover:text-teal-600 transition hover:underline"
                          >
                            {d.nama}
                          </Link>
                          <p className="text-xs text-gray-400">{d.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">{d.spesialis}</td>
                    <td className="px-6 py-4 text-gray-600">{d.noHp}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{d.jadwal}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          BADGE_COLORS[d.status] || BADGE_COLORS["Tidak Aktif"]
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => openEdit(d)}
                          className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">
                {isEdit ? "Edit Data Dokter" : "Tambah Dokter Baru"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spesialis</label>
                  <input
                    required
                    value={form.spesialis}
                    onChange={(e) => setForm({ ...form, spesialis: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                <input
                  required
                  value={form.noHp}
                  onChange={(e) => setForm({ ...form, noHp: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal Praktik</label>
                <input
                  value={form.jadwal}
                  onChange={(e) => setForm({ ...form, jadwal: e.target.value })}
                  placeholder="cth: Senin – Jumat, 08:00 – 16:00"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition shadow-sm"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
