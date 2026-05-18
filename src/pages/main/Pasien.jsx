import { useState, useMemo } from "react";
import { FaPlus, FaSearch, FaEdit, FaUserAlt, FaNotesMedical } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import Avatar from "../../components/Avatar";
import SelectField from "../../components/SelectField";
import TextArea from "../../components/TextArea";
import Alert from "../../components/Alert";
import Table from "../../components/Table";

const STATUS_BADGE = {
  Aktif: "success",
  Baru: "primary",
  VIP: "warning",
  "Tidak Aktif": "danger",
};

const EMPTY_FORM = {
  nama: "",
  tanggalLahir: "",
  jenisKelamin: "L",
  noHp: "",
  alamat: "",
  status: "Baru",
  catatan: "",
};

export default function Pasien() {
  const { patients: pasienData, setPatients: setPasienData } = useClinic();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEdit, setIsEdit] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");

  const totalPasien = pasienData.length;
  const pasienBaru = pasienData.filter((p) => p.status === "Baru").length;

  const filteredPasien = useMemo(() => {
    return pasienData.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === "Semua" || p.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [pasienData, searchTerm, filterStatus]);

  const calculateAge = (dob) => {
    if (!dob) return 0;
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEdit) {
      setPasienData(
        pasienData.map((p) =>
          p.id === form.id ? { ...form, umur: calculateAge(form.tanggalLahir) } : p
        )
      );
      setSuccessAlert(`Data pasien ${form.nama} berhasil diperbarui.`);
    } else {
      setPasienData([
        {
          ...form,
          id: `PS-${String(pasienData.length + 1).padStart(3, "0")}`,
          umur: calculateAge(form.tanggalLahir),
          terakhirKunjungan: "-",
          riwayatMedis: [],
          riwayatJanji: [],
          riwayatPembayaran: [],
        },
        ...pasienData,
      ]);
      setSuccessAlert(`Pasien baru ${form.nama} berhasil ditambahkan.`);
    }
    closeForm();
    setTimeout(() => setSuccessAlert(""), 4000);
  };

  const openEdit = (p) => { setForm(p); setIsEdit(true); setShowForm(true); };
  const closeForm = () => { setForm(EMPTY_FORM); setIsEdit(false); setShowForm(false); };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Page Header */}
      <PageHeader title="Manajemen Pasien" breadcrumb={["Pasien"]}>
        <Button type="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Pasien
        </Button>
      </PageHeader>

      {/* Success Alert */}
      {successAlert && (
        <div className="mb-4">
          <Alert type="success" onClose={() => setSuccessAlert("")}>
            {successAlert}
          </Alert>
        </div>
      )}

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">
              <FaUserAlt />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Pasien</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalPasien}</h3>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl">
              <FaNotesMedical />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Pasien Baru</p>
              <h3 className="text-2xl font-bold text-gray-800">{pasienBaru}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <InputField
              placeholder="Cari pasien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<FaSearch />}
            />
            <SelectField
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: "Semua", label: "Semua Status" },
                { value: "Aktif", label: "Aktif" },
                { value: "Baru", label: "Baru" },
                { value: "VIP", label: "VIP" },
                { value: "Tidak Aktif", label: "Tidak Aktif" },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table headers={["ID", "Profil Pasien", "L/P", "No. HP", "Kunjungan Terakhir", "Status", "Aksi"]}>
          {filteredPasien.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                Tidak ada data pasien ditemukan.
              </td>
            </tr>
          ) : (
            filteredPasien.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition text-sm">
                <td className="px-4 py-4 font-medium text-gray-600">{p.id}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={p.nama} />
                    <div>
                      <Link to={`/pasien/${p.id}`} className="font-semibold text-gray-800 hover:text-[#f06b6b] hover:underline transition">
                        {p.nama}
                      </Link>
                      <p className="text-xs text-gray-400">{p.umur} Tahun • {p.alamat}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-600">{p.jenisKelamin}</td>
                <td className="px-4 py-4 text-gray-600">{p.noHp}</td>
                <td className="px-4 py-4 text-gray-500">{p.terakhirKunjungan}</td>
                <td className="px-4 py-4">
                  <Badge type={STATUS_BADGE[p.status] || "secondary"}>{p.status}</Badge>
                </td>
                <td className="px-4 py-4 text-center">
                  <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition">
                    <FaEdit className="text-lg" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </Table>
      </Card>

      {/* Modal */}
      <Modal isOpen={showForm} onClose={closeForm} title={isEdit ? "Edit Data Pasien" : "Tambah Pasien Baru"}>
        <form onSubmit={handleSave} className="space-y-4">
          <InputField
            label="Nama Lengkap"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            placeholder="Nama lengkap pasien"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <input
                type="date"
                value={form.tanggalLahir}
                onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]"
              />
            </div>
            <SelectField
              label="Jenis Kelamin"
              value={form.jenisKelamin}
              onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value })}
              options={[
                { value: "L", label: "Laki-laki" },
                { value: "P", label: "Perempuan" },
              ]}
            />
          </div>
          <InputField
            label="Nomor HP"
            value={form.noHp}
            onChange={(e) => setForm({ ...form, noHp: e.target.value })}
            placeholder="08xxxxxxxxxx"
          />
          <InputField
            label="Alamat"
            value={form.alamat}
            onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            placeholder="Kota / Kabupaten"
          />
          <SelectField
            label="Status Pasien"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: "Aktif", label: "Aktif" },
              { value: "Baru", label: "Baru" },
              { value: "VIP", label: "VIP" },
              { value: "Tidak Aktif", label: "Tidak Aktif" },
            ]}
          />
          <TextArea
            label="Catatan Tambahan"
            value={form.catatan || ""}
            onChange={(e) => setForm({ ...form, catatan: e.target.value })}
            placeholder="Catatan khusus untuk pasien ini (opsional)..."
            rows={3}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="secondary" onClick={closeForm}>Batal</Button>
            <Button type="primary">Simpan Data</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
