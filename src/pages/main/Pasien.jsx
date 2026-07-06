import { useState, useMemo, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaUserAlt, FaNotesMedical, FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useClinic } from "../../context/useClinic";
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
  "Tidak Aktif": "danger",
};

const MEMBERSHIP_BADGE = {
  Platinum: "warning",
  Gold: "warning",
  Silver: "secondary",
  Regular: "primary",
};

const EMPTY_FORM = {
  nama: "",
  tanggalLahir: "",
  jenisKelamin: "L",
  noHp: "",
  alamat: "",
  status: "Aktif",
  levelMembership: "Regular",
  referralCode: "",
  jenisPerwatan: "",
  terakhirKunjungan: "",
  totalBiaya: "",
  metodePembayaran: "",
  feedback: "",
  sumber: "",
  catatan: "",
};

import { pasienService } from "../../services/supabaseService";
import { janjiTemuService } from "../../services/supabaseService";

export default function Pasien() {
  const { patients: pasienData, refreshPatients } = useClinic();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterMembership, setFilterMembership] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEdit, setIsEdit] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");
  const [saving, setSaving] = useState(false);

  // Nama dari janji temu yang belum terdaftar sebagai pasien
  const [namaFromJanji, setNamaFromJanji] = useState([]);

  useEffect(() => {
    janjiTemuService.getAll().then((janji) => {
      const namaPasienTerdaftar = new Set(pasienData.map((p) => p.nama?.toLowerCase()));
      const namaJanji = [...new Set(
        janji.map((j) => j.pasienNama || j.pasien_nama).filter(Boolean)
      )].filter((n) => !namaPasienTerdaftar.has(n?.toLowerCase()));
      setNamaFromJanji(namaJanji);
    }).catch(() => {});
  }, [pasienData]);

  const totalPasien = pasienData.length;
  const pasienAktif = pasienData.filter((p) => p.status === "Aktif").length;
  const pasienPlatinum = pasienData.filter((p) => p.levelMembership === "Platinum").length;

  const filteredPasien = useMemo(() => {
    return pasienData.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.alamat && p.alamat.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchStatus = filterStatus === "Semua" || p.status === filterStatus;
      const matchMembership = filterMembership === "Semua" || p.levelMembership === filterMembership;
      return matchSearch && matchStatus && matchMembership;
    });
  }, [pasienData, searchTerm, filterStatus, filterMembership]);

  const calculateAge = (dob) => {
    if (!dob) return 0;
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, umur: calculateAge(form.tanggalLahir) };
      if (isEdit) {
        await pasienService.update(form.uuid, payload);
        setSuccessAlert(`Data pasien ${form.nama} berhasil diperbarui.`);
      } else {
        await pasienService.create(payload);
        setSuccessAlert(`Pasien baru ${form.nama} berhasil ditambahkan.`);
      }
      await refreshPatients();
      closeForm();
    } catch (err) {
      console.error("Gagal simpan pasien:", err);
      setSuccessAlert("");
      alert("Gagal menyimpan data pasien. Cek koneksi database.");
    } finally {
      setSaving(false);
    }
    setTimeout(() => setSuccessAlert(""), 4000);
  };

  const openEdit = (p) => { setForm(p); setIsEdit(true); setShowForm(true); };
  const closeForm = () => { setForm(EMPTY_FORM); setIsEdit(false); setShowForm(false); };

  const handleDelete = async (uuid, nama) => {
    if (!window.confirm(`Hapus pasien "${nama}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await pasienService.delete(uuid);
      await refreshPatients();
      setSuccessAlert(`Pasien "${nama}" berhasil dihapus.`);
      setTimeout(() => setSuccessAlert(""), 4000);
    } catch (err) {
      console.error("Gagal hapus pasien:", err);
      alert("Gagal menghapus pasien.");
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
              <p className="text-gray-500 text-sm font-medium">Pasien Aktif</p>
              <h3 className="text-2xl font-bold text-gray-800">{pasienAktif}</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center text-xl">
              <FaCrown />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Member</p>
              <h3 className="text-2xl font-bold text-gray-800">{pasienPlatinum}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <InputField
              placeholder="Cari nama, ID, atau kota..."
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
            <SelectField
              value={filterMembership}
              onChange={(e) => setFilterMembership(e.target.value)}
              options={[
                { value: "Semua", label: "Semua Membership" },
                { value: "Platinum", label: "Platinum" },
                { value: "Gold", label: "Gold" },
                { value: "Silver", label: "Silver" },
                { value: "Regular", label: "Regular" },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table headers={["ID", "Profil Pasien", "Kontak", "Perawatan Terakhir", "Total Biaya", "Membership", "Status", "Aksi"]}>
          {filteredPasien.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-6 py-8 text-center text-gray-400">
                Tidak ada data pasien ditemukan.
              </td>
            </tr>
          ) : (
            filteredPasien.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition text-sm">
                <td className="px-4 py-4 font-medium text-gray-500 text-xs">{p.id}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={p.nama} />
                    <div>
                      <Link to={`/pasien/${p.id}`} className="font-semibold text-gray-800 hover:text-[#f06b6b] hover:underline transition">
                        {p.nama}
                      </Link>
                      <p className="text-xs text-gray-400">
                        {p.umur} thn • {p.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"} • {p.alamat}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-gray-700 text-xs">{p.noHp}</p>
                  <p className="text-gray-400 text-xs mt-0.5">Sumber: {p.sumber || "-"}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-gray-700 text-xs font-medium">{p.jenisPerwatan || "-"}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{p.terakhirKunjungan}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-gray-800 text-xs font-semibold">
                    {p.totalBiaya ? formatRupiah(p.totalBiaya) : "-"}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{p.metodePembayaran || "-"}</p>
                </td>
                <td className="px-4 py-4">
                  <Badge type={MEMBERSHIP_BADGE[p.levelMembership] || "secondary"}>
                    {p.levelMembership || "-"}
                  </Badge>
                  <p className="text-gray-400 text-xs mt-1">{p.referralCode || ""}</p>
                </td>
                <td className="px-4 py-4">
                  <Badge type={STATUS_BADGE[p.status] || "secondary"}>{p.status}</Badge>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition">
                      <FaEdit className="text-lg" />
                    </button>
                    <button onClick={() => handleDelete(p.uuid, p.nama)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      </Card>

      {/* Modal */}
      <Modal isOpen={showForm} onClose={closeForm} title={isEdit ? "Edit Data Pasien" : "Tambah Pasien Baru"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              required
              list="nama-pasien-list"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="Nama lengkap pasien / pilih dari janji temu"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]"
            />
            <datalist id="nama-pasien-list">
              {namaFromJanji.map((nama) => (
                <option key={nama} value={nama} />
              ))}
            </datalist>
            {namaFromJanji.length > 0 && (
              <p className="text-xs text-blue-500 mt-0.5">
                💡 {namaFromJanji.length} nama tersedia dari janji temu yang belum terdaftar
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <input type="date" value={form.tanggalLahir}
                onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
            </div>
            <SelectField label="Jenis Kelamin" value={form.jenisKelamin}
              onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value })}
              options={[{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }]} />
          </div>
          <InputField label="Nomor HP" value={form.noHp}
            onChange={(e) => setForm({ ...form, noHp: e.target.value })} placeholder="08xxxxxxxxxx" />
          <InputField label="Kota / Alamat" value={form.alamat}
            onChange={(e) => setForm({ ...form, alamat: e.target.value })} placeholder="Kota / Kabupaten" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Perawatan Terakhir" value={form.jenisPerwatan || ""}
              onChange={(e) => setForm({ ...form, jenisPerwatan: e.target.value })} placeholder="cth: Tambal Gigi" />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tanggal Kunjungan Terakhir</label>
              <input type="date" value={form.terakhirKunjungan && form.terakhirKunjungan !== "-" ? form.terakhirKunjungan : ""}
                onChange={(e) => setForm({ ...form, terakhirKunjungan: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Total Biaya (Rp)" type="number" value={form.totalBiaya || ""}
              onChange={(e) => setForm({ ...form, totalBiaya: e.target.value })} placeholder="0" />
            <SelectField label="Metode Pembayaran" value={form.metodePembayaran || ""}
              onChange={(e) => setForm({ ...form, metodePembayaran: e.target.value })}
              options={[{ value: "", label: "-- Pilih --" }, { value: "Cash", label: "Cash" }, { value: "QRIS", label: "QRIS" }, { value: "E-wallet", label: "E-wallet" }, { value: "Debit", label: "Debit" }, { value: "Transfer Bank", label: "Transfer Bank" }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Status Pasien" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              options={[{ value: "Aktif", label: "Aktif" }, { value: "Tidak Aktif", label: "Tidak Aktif" }]} />
            <SelectField label="Level Membership" value={form.levelMembership}
              onChange={(e) => setForm({ ...form, levelMembership: e.target.value })}
              options={[{ value: "Regular", label: "Regular" }, { value: "Silver", label: "Silver" }, { value: "Gold", label: "Gold" }, { value: "Platinum", label: "Platinum" }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Referral Code" value={form.referralCode || ""}
              onChange={(e) => setForm({ ...form, referralCode: e.target.value })} placeholder="DEN0000" />
            <SelectField label="Sumber Pasien" value={form.sumber || ""}
              onChange={(e) => setForm({ ...form, sumber: e.target.value })}
              options={[{ value: "", label: "-- Pilih --" }, { value: "Instagram", label: "Instagram" }, { value: "TikTok", label: "TikTok" }, { value: "WhatsApp", label: "WhatsApp" }, { value: "Referral", label: "Referral" }, { value: "Website", label: "Website" }]} />
          </div>
          <TextArea label="Catatan / Feedback" value={form.feedback || form.catatan || ""}
            onChange={(e) => setForm({ ...form, feedback: e.target.value, catatan: e.target.value })}
            placeholder="Catatan atau feedback pasien..." rows={3} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="secondary" onClick={closeForm}>Batal</Button>
            <Button type="primary">Simpan Data</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
