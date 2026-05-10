import { useState, useMemo } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTimes,
  FaUserAlt,
  FaNotesMedical,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useClinic } from "../../context/ClinicContext";

const BADGE_COLORS = {
  Aktif: "bg-green-100 text-green-700",
  Baru: "bg-blue-100 text-blue-700",
  VIP: "bg-yellow-100 text-yellow-700",
  "Tidak Aktif": "bg-red-100 text-red-700",
};

const EMPTY_FORM = {
  nama: "",
  tanggalLahir: "",
  jenisKelamin: "L",
  noHp: "",
  alamat: "",
  status: "Baru",
};

export default function Pasien() {
  const { patients: pasienData, setPatients: setPasienData } = useClinic();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEdit, setIsEdit] = useState(false);

  // Statistik
  const totalPasien = pasienData.length;

  const pasienBaruBulanIni = pasienData.filter(
    (p) => p.status === "Baru"
  ).length;

  // Filter
  const filteredPasien = useMemo(() => {
    return pasienData.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        filterStatus === "Semua" || p.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [pasienData, searchTerm, filterStatus]);

  // Hitung umur
  const calculateAge = (dob) => {
    if (!dob) return 0;

    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Simpan data
  const handleSave = (e) => {
    e.preventDefault();

    if (isEdit) {
      setPasienData(
        pasienData.map((p) =>
          p.id === form.id
            ? {
                ...form,
                umur: calculateAge(form.tanggalLahir),
              }
            : p
        )
      );
    } else {
      const newPasien = {
        ...form,
        id: `PS-${String(pasienData.length + 1).padStart(3, "0")}`,
        umur: calculateAge(form.tanggalLahir),
        terakhirKunjungan: "-",
        riwayatMedis: [],
        riwayatJanji: [],
        riwayatPembayaran: [],
      };

      setPasienData([newPasien, ...pasienData]);
    }

    closeForm();
  };

  // Edit
  const openEdit = (p) => {
    setForm(p);
    setIsEdit(true);
    setShowForm(true);
  };

  // Tutup modal
  const closeForm = () => {
    setForm(EMPTY_FORM);
    setIsEdit(false);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader
        title="Manajemen Pasien"
        breadcrumb="Daftar Pasien"
      />

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">
            <FaUserAlt />
          </div>

          <div>
            <p className="text-gray-500 text-sm font-medium">
              Total Pasien
            </p>

            <h3 className="text-2xl font-bold text-gray-800">
              {totalPasien}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl">
            <FaNotesMedical />
          </div>

          <div>
            <p className="text-gray-500 text-sm font-medium">
              Pasien Baru
            </p>

            <h3 className="text-2xl font-bold text-gray-800">
              {pasienBaruBulanIni}
            </h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Cari pasien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-40 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="Semua">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Baru">Baru</option>
            <option value="VIP">VIP</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>

        {/* Tombol tambah */}
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          <FaPlus />
          <span>Tambah Pasien</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Profil Pasien</th>
                <th className="px-6 py-4">L/P</th>
                <th className="px-6 py-4">No. HP</th>
                <th className="px-6 py-4">Kunjungan Terakhir</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filteredPasien.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    Tidak ada data pasien ditemukan.
                  </td>
                </tr>
              ) : (
                filteredPasien.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-blue-50/50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {p.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                          {p.nama.charAt(0).toUpperCase()}
                        </div>

                        {/* Nama */}
                        <div>
                          <Link
                            to={`/pasien/${p.id}`}
                            className="font-semibold text-gray-800 hover:text-[#1A7C6E] transition hover:underline"
                          >
                            {p.nama}
                          </Link>

                          <p className="text-xs text-gray-400">
                            {p.umur} Tahun • {p.alamat}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {p.jenisKelamin}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {p.noHp}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {p.terakhirKunjungan}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          BADGE_COLORS[p.status] ||
                          BADGE_COLORS["Tidak Aktif"]
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">
                {isEdit
                  ? "Edit Data Pasien"
                  : "Tambah Pasien Baru"}
              </h2>

              <button
                onClick={closeForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSave}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>

                <input
                  required
                  value={form.nama}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nama: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Lahir
                  </label>

                  <input
                    required
                    type="date"
                    value={form.tanggalLahir}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tanggalLahir: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Kelamin
                  </label>

                  <select
                    value={form.jenisKelamin}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        jenisKelamin: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor HP
                </label>

                <input
                  required
                  value={form.noHp}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      noHp: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat
                </label>

                <textarea
                  required
                  rows="2"
                  value={form.alamat}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      alamat: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status Pasien
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Baru">Baru</option>
                  <option value="VIP">VIP</option>
                  <option value="Tidak Aktif">
                    Tidak Aktif
                  </option>
                </select>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
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