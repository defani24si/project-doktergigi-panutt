import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaUserMd, FaStethoscope } from "react-icons/fa";
import { useClinic } from "../../context/useClinic";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import Avatar from "../../components/Avatar";
import SelectField from "../../components/SelectField";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import { dokterService } from "../../services/supabaseService";

const STATUS_BADGE = {
  Aktif: "success",
  "Tidak Aktif": "danger",
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
  const { doctors, refreshDoctors } = useClinic();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEdit, setIsEdit] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");

  const totalDokter = doctors.length;
  const dokterAktif = doctors.filter((d) => d.status === "Aktif").length;

  const filteredDokter = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch =
        d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.spesialis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === "Semua" || d.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [doctors, searchTerm, filterStatus]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await dokterService.update(form.uuid, form);
        setSuccessAlert(`Data dokter ${form.nama} berhasil diperbarui.`);
      } else {
        await dokterService.create(form);
        setSuccessAlert(`Dokter baru ${form.nama} berhasil ditambahkan.`);
      }
      await refreshDoctors();
      closeForm();
    } catch (err) {
      console.error("Gagal simpan dokter:", err);
      alert("Gagal menyimpan data dokter. Cek koneksi database.");
    }
    setTimeout(() => setSuccessAlert(""), 4000);
  };

  const openEdit = (d) => { setForm(d); setIsEdit(true); setShowForm(true); };
  const closeForm = () => { setForm(EMPTY_FORM); setIsEdit(false); setShowForm(false); };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Page Header */}
      <PageHeader title="Manajemen Dokter" breadcrumb={["Dokter"]}>
        <Button type="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Dokter
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
            <div className="w-12 h-12 bg-[#fde8e8] text-[#f06b6b] rounded-full flex items-center justify-center text-xl">
              <FaUserMd />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Dokter</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalDokter}</h3>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl">
              <FaStethoscope />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Dokter Aktif</p>
              <h3 className="text-2xl font-bold text-gray-800">{dokterAktif}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <InputField
              placeholder="Cari dokter atau spesialis..."
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
                { value: "Tidak Aktif", label: "Tidak Aktif" },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table headers={["ID", "Profil Dokter", "Spesialis", "No. HP", "Jadwal Praktik", "Status", "Aksi"]}>
          {filteredDokter.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                Tidak ada data dokter ditemukan.
              </td>
            </tr>
          ) : (
            filteredDokter.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50 transition text-sm">
                <td className="px-4 py-4 font-medium text-gray-600">{d.id}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={d.nama} />
                    <div>
                      <Link to={`/dokter/${d.id}`} className="font-semibold text-gray-800 hover:text-[#f06b6b] hover:underline transition">
                        {d.nama}
                      </Link>
                      <p className="text-xs text-gray-400">{d.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-600">{d.spesialis}</td>
                <td className="px-4 py-4 text-gray-600">{d.noHp}</td>
                <td className="px-4 py-4 text-gray-500 text-xs">{d.jadwal}</td>
                <td className="px-4 py-4">
                  <Badge type={STATUS_BADGE[d.status] || "secondary"}>{d.status}</Badge>
                </td>
                <td className="px-4 py-4 text-center">
                  <button onClick={() => openEdit(d)} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition">
                    <FaEdit className="text-lg" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </Table>
      </Card>

      {/* Modal Tambah / Edit Dokter */}
      <Modal isOpen={showForm} onClose={closeForm} title={isEdit ? "Edit Data Dokter" : "Tambah Dokter Baru"}>
        <form onSubmit={handleSave} className="space-y-4">
          <InputField label="Nama Lengkap" value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="drg. Nama Dokter" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Spesialis" value={form.spesialis}
              onChange={(e) => setForm({ ...form, spesialis: e.target.value })} placeholder="Umum / Ortodonti" />
            <SelectField label="Status" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              options={[{ value: "Aktif", label: "Aktif" }, { value: "Tidak Aktif", label: "Tidak Aktif" }]} />
          </div>
          <InputField label="Nomor HP" value={form.noHp}
            onChange={(e) => setForm({ ...form, noHp: e.target.value })} placeholder="08xxxxxxxxxx" />
          <InputField label="Email" type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="dokter@klinik.id" />
          <InputField label="Jadwal Praktik" value={form.jadwal}
            onChange={(e) => setForm({ ...form, jadwal: e.target.value })} placeholder="Senin – Jumat, 08:00 – 16:00" />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="secondary" onClick={closeForm}>Batal</Button>
            <Button type="primary">Simpan Data</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
