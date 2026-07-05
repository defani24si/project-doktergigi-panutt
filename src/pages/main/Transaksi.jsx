import { useState, useEffect, useMemo } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaFileInvoice, FaCheckCircle, FaHourglass } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import Avatar from "../../components/Avatar";
import { transaksiService } from "../../services/supabaseService";

const STATUS_BADGE = {
  Lunas: "success",
  Pending: "warning",
  Dibatalkan: "danger",
};

const EMPTY_FORM = {
  pasienNama: "", pasienEmail: "", layanan: "",
  dokterNama: "", tanggal: new Date().toISOString().split("T")[0],
  biaya: "", diskonPersen: "0", diskonNominal: "0",
  total: "", metodePembayaran: "", kodePromo: "", status: "Pending", catatan: "",
};

const LAYANAN_LIST = ["Konsultasi", "Scaling Gigi", "Tambal Komposit", "Cabut Gigi", "Odontektomi", "Kawat Gigi", "Pemutihan Gigi", "Pemasangan Crown"];
const METODE_LIST = ["Cash", "Transfer Bank", "QRIS", "E-wallet", "Debit", "Kartu Kredit"];

export default function Transaksi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [successAlert, setSuccessAlert] = useState("");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await transaksiService.getAll();
      setData(res);
    } catch (err) {
      console.error("Gagal load transaksi:", err);
    } finally {
      setLoading(false);
    }
  };

  // Hitung total otomatis saat biaya/diskon berubah
  const handleBiayaChange = (biaya, diskonPersen) => {
    const b = Number(biaya) || 0;
    const d = Number(diskonPersen) || 0;
    const nominal = Math.round(b * d / 100);
    const total = b - nominal;
    return { diskonNominal: String(nominal), total: String(total) };
  };

  const filteredData = useMemo(() => {
    return data.filter((t) => {
      const matchSearch = t.pasien_nama?.toLowerCase().includes(search.toLowerCase()) ||
        t.invoice?.toLowerCase().includes(search.toLowerCase()) ||
        t.layanan?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "Semua" || t.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [data, search, filterStatus]);

  const totalLunas = data.filter((t) => t.status === "Lunas").reduce((s, t) => s + Number(t.total), 0);
  const totalPending = data.filter((t) => t.status === "Pending").length;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await transaksiService.update(editId, {
          pasien_nama: form.pasienNama,
          pasien_email: form.pasienEmail || null,
          layanan: form.layanan,
          dokter_nama: form.dokterNama || null,
          tanggal: form.tanggal,
          biaya: Number(form.biaya),
          diskon_persen: Number(form.diskonPersen),
          diskon_nominal: Number(form.diskonNominal),
          total: Number(form.total),
          metode_pembayaran: form.metodePembayaran || null,
          kode_promo: form.kodePromo || null,
          status: form.status,
          catatan: form.catatan || null,
        });
        setSuccessAlert("Transaksi berhasil diperbarui.");
      } else {
        await transaksiService.create({
          pasienNama: form.pasienNama,
          pasienEmail: form.pasienEmail,
          layanan: form.layanan,
          dokterNama: form.dokterNama,
          tanggal: form.tanggal,
          biaya: Number(form.biaya),
          diskonPersen: Number(form.diskonPersen),
          diskonNominal: Number(form.diskonNominal),
          total: Number(form.total),
          metodePembayaran: form.metodePembayaran,
          kodePromo: form.kodePromo,
          status: form.status,
          catatan: form.catatan,
        });
        setSuccessAlert("Transaksi baru berhasil ditambahkan.");
      }
      await loadData();
      closeForm();
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Gagal menyimpan transaksi. Cek koneksi database.");
    }
    setTimeout(() => setSuccessAlert(""), 4000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus transaksi ini?")) return;
    try {
      await transaksiService.delete(id);
      await loadData();
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await transaksiService.updateStatus(id, status);
      await loadData();
    } catch (err) {
      console.error("Gagal update status:", err);
    }
  };

  const openEdit = (t) => {
    setForm({
      pasienNama: t.pasien_nama || "",
      pasienEmail: t.pasien_email || "",
      layanan: t.layanan || "",
      dokterNama: t.dokter_nama || "",
      tanggal: t.tanggal || "",
      biaya: String(t.biaya || ""),
      diskonPersen: String(t.diskon_persen || "0"),
      diskonNominal: String(t.diskon_nominal || "0"),
      total: String(t.total || ""),
      metodePembayaran: t.metode_pembayaran || "",
      kodePromo: t.kode_promo || "",
      status: t.status || "Pending",
      catatan: t.catatan || "",
    });
    setEditId(t.id);
    setIsEdit(true);
    setShowForm(true);
  };

  const closeForm = () => {
    setForm(EMPTY_FORM);
    setIsEdit(false);
    setEditId(null);
    setShowForm(false);
  };

  const formatRp = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Transaksi" breadcrumb={["Transaksi"]}>
        <Button type="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Transaksi
        </Button>
      </PageHeader>

      {successAlert && (
        <div className="mb-4">
          <Alert type="success" onClose={() => setSuccessAlert("")}>{successAlert}</Alert>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <Card>
          <p className="text-gray-500 text-sm">Total Transaksi</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{data.length}</h3>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Total Lunas</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{data.filter(t => t.status === "Lunas").length}</h3>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Pending</p>
          <h3 className="text-2xl font-bold text-yellow-600 mt-1">{totalPending}</h3>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Total Pendapatan (Lunas)</p>
          <h3 className="text-lg font-bold mt-1" style={{ color: "#f06b6b" }}>{formatRp(totalLunas)}</h3>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="mb-5">
        <div className="flex flex-wrap gap-3">
          <InputField
            placeholder="Cari pasien, invoice, layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<FaSearch />}
          />
          <SelectField
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: "Semua", label: "Semua Status" },
              { value: "Lunas", label: "Lunas" },
              { value: "Pending", label: "Pending" },
              { value: "Dibatalkan", label: "Dibatalkan" },
            ]}
          />
        </div>
      </Card>

      {/* Tabel */}
      <Card>
        {loading ? (
          <p className="text-center text-gray-400 py-8">Memuat data...</p>
        ) : (
          <Table headers={["Invoice", "Pasien", "Layanan", "Dokter", "Tanggal", "Total", "Metode", "Status", "Aksi"]}>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-8 text-center text-gray-400">Tidak ada data transaksi.</td>
              </tr>
            ) : (
              filteredData.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition text-sm">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500 font-semibold">{t.invoice}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={t.pasien_nama} />
                      <div>
                        <p className="font-semibold text-gray-800 text-xs">{t.pasien_nama}</p>
                        <p className="text-gray-400 text-xs">{t.pasien_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{t.layanan}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{t.dokter_nama || "-"}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{t.tanggal}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-gray-800 text-xs">{formatRp(t.total)}</p>
                    {t.diskon_persen > 0 && (
                      <p className="text-xs text-green-600">-{t.diskon_persen}% diskon</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{t.metode_pembayaran || "-"}</td>
                  <td className="px-4 py-3">
                    <Badge type={STATUS_BADGE[t.status] || "secondary"}>{t.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {t.status === "Pending" && (
                        <button
                          onClick={() => handleUpdateStatus(t.id, "Lunas")}
                          title="Tandai Lunas"
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                      <button
                        onClick={() => openEdit(t)}
                        title="Edit"
                        className="p-1.5 text-yellow-500 hover:bg-yellow-50 rounded-lg transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        title="Hapus"
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </Table>
        )}
      </Card>

      {/* Modal Form */}
      <Modal isOpen={showForm} onClose={closeForm} title={isEdit ? "Edit Transaksi" : "Tambah Transaksi Baru"}>
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Nama Pasien" required value={form.pasienNama}
              onChange={(e) => setForm({ ...form, pasienNama: e.target.value })} placeholder="Nama pasien" />
            <InputField label="Email Pasien" type="email" value={form.pasienEmail}
              onChange={(e) => setForm({ ...form, pasienEmail: e.target.value })} placeholder="email@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Layanan" value={form.layanan}
              onChange={(e) => setForm({ ...form, layanan: e.target.value })}
              options={LAYANAN_LIST.map((l) => ({ value: l, label: l }))} />
            <InputField label="Nama Dokter" value={form.dokterNama}
              onChange={(e) => setForm({ ...form, dokterNama: e.target.value })} placeholder="drg. ..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tanggal</label>
              <input required type="date" value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
            </div>
            <InputField label="Biaya (Rp)" type="number" required value={form.biaya}
              onChange={(e) => {
                const calc = handleBiayaChange(e.target.value, form.diskonPersen);
                setForm({ ...form, biaya: e.target.value, ...calc });
              }} placeholder="250000" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Diskon (%)" type="number" value={form.diskonPersen}
              onChange={(e) => {
                const calc = handleBiayaChange(form.biaya, e.target.value);
                setForm({ ...form, diskonPersen: e.target.value, ...calc });
              }} placeholder="0" />
            <InputField label="Total (Rp)" type="number" required value={form.total}
              onChange={(e) => setForm({ ...form, total: e.target.value })} placeholder="250000" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Metode Pembayaran" value={form.metodePembayaran}
              onChange={(e) => setForm({ ...form, metodePembayaran: e.target.value })}
              options={METODE_LIST.map((m) => ({ value: m, label: m }))} />
            <InputField label="Kode Promo" value={form.kodePromo}
              onChange={(e) => setForm({ ...form, kodePromo: e.target.value.toUpperCase() })} placeholder="cth: GIGI10" />
          </div>
          <SelectField label="Status" value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: "Pending", label: "Pending" },
              { value: "Lunas", label: "Lunas" },
              { value: "Dibatalkan", label: "Dibatalkan" },
            ]} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="secondary" onClick={closeForm}>Batal</Button>
            <Button type="primary">Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
