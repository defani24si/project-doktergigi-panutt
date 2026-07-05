import { useState, useEffect, useMemo } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTooth } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import TextArea from "../../components/TextArea";
import Alert from "../../components/Alert";
import Avatar from "../../components/Avatar";
import { catatanKesehatanService } from "../../services/supabaseService";

const STATUS_BADGE = {
  Selesai: "success",
  "Dalam Perawatan": "warning",
  "Perlu Kontrol": "primary",
};

const EMPTY_FORM = {
  pasienNama: "", pasienEmail: "", tanggal: new Date().toISOString().split("T")[0],
  tindakan: "", dokter: "", diagnosis: "", resep: "", biaya: "", status: "Selesai",
};

export default function CatatanKesehatan() {
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
      const res = await catatanKesehatanService.getAll();
      setData(res);
    } catch (err) {
      console.error("Gagal load catatan:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return data.filter((c) => {
      const matchSearch =
        c.pasien_nama?.toLowerCase().includes(search.toLowerCase()) ||
        c.tindakan?.toLowerCase().includes(search.toLowerCase()) ||
        c.dokter?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "Semua" || c.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [data, search, filterStatus]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await catatanKesehatanService.update(editId, form);
        setSuccessAlert("Catatan kesehatan berhasil diperbarui.");
      } else {
        await catatanKesehatanService.create(form);
        setSuccessAlert("Catatan kesehatan baru berhasil ditambahkan.");
      }
      await loadData();
      closeForm();
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Gagal menyimpan data. Cek koneksi database.");
    }
    setTimeout(() => setSuccessAlert(""), 4000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus catatan ini?")) return;
    try {
      await catatanKesehatanService.delete(id);
      await loadData();
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  const openEdit = (c) => {
    setForm({
      pasienNama: c.pasien_nama || "",
      pasienEmail: c.pasien_email || "",
      tanggal: c.tanggal || "",
      tindakan: c.tindakan || "",
      dokter: c.dokter || "",
      diagnosis: c.diagnosis || "",
      resep: c.resep || "",
      biaya: String(c.biaya || ""),
      status: c.status || "Selesai",
    });
    setEditId(c.id);
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
      <PageHeader title="Catatan Kesehatan" breadcrumb={["Catatan Kesehatan"]}>
        <Button type="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Catatan
        </Button>
      </PageHeader>

      {successAlert && (
        <div className="mb-4">
          <Alert type="success" onClose={() => setSuccessAlert("")}>{successAlert}</Alert>
        </div>
      )}

      {/* Stat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Card>
          <p className="text-gray-500 text-sm">Total Catatan</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{data.length}</h3>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Selesai</p>
          <h3 className="text-2xl font-bold text-green-600 mt-1">{data.filter(d => d.status === "Selesai").length}</h3>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Perlu Tindak Lanjut</p>
          <h3 className="text-2xl font-bold mt-1" style={{ color: "#f06b6b" }}>
            {data.filter(d => d.status !== "Selesai").length}
          </h3>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="mb-5">
        <div className="flex flex-wrap gap-3">
          <InputField
            placeholder="Cari pasien, tindakan, dokter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<FaSearch />}
          />
          <SelectField
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: "Semua", label: "Semua Status" },
              { value: "Selesai", label: "Selesai" },
              { value: "Dalam Perawatan", label: "Dalam Perawatan" },
              { value: "Perlu Kontrol", label: "Perlu Kontrol" },
            ]}
          />
        </div>
      </Card>

      {/* Cards List — mirip tampilan di member */}
      {loading ? (
        <p className="text-center text-gray-400 py-8">Memuat data...</p>
      ) : filtered.length === 0 ? (
        <Card>
          <p className="text-center text-gray-400 py-8">Tidak ada catatan kesehatan ditemukan.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              {/* Header card */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#fde8e8" }}>
                    <FaTooth className="text-[#f06b6b] text-lg" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-800">{c.tindakan}</h3>
                      <Badge type={STATUS_BADGE[c.status] || "secondary"}>{c.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                      <span>📅 {c.tanggal}</span>
                      {c.dokter && <span>👨‍⚕️ {c.dokter}</span>}
                    </div>
                  </div>
                </div>

                {/* Pasien + biaya */}
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <Avatar name={c.pasien_nama} />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{c.pasien_nama}</p>
                      <p className="text-[10px] text-gray-400">{c.pasien_email || ""}</p>
                    </div>
                  </div>
                  <p className="font-bold text-sm" style={{ color: "#f06b6b" }}>{formatRp(c.biaya)}</p>
                </div>
              </div>

              {/* Detail diagnosis + resep */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl px-4 py-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Diagnosis</p>
                  <p className="text-sm text-gray-700">{c.diagnosis || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Resep & Catatan</p>
                  <p className="text-sm text-gray-700">{c.resep || "-"}</p>
                </div>
              </div>

              {/* Aksi */}
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 transition">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(c.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition">
                  <FaTrash /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <Modal isOpen={showForm} onClose={closeForm} title={isEdit ? "Edit Catatan Kesehatan" : "Tambah Catatan Kesehatan"}>
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Nama Pasien" required value={form.pasienNama}
              onChange={(e) => setForm({ ...form, pasienNama: e.target.value })} placeholder="Nama pasien" />
            <InputField label="Email Pasien" type="email" value={form.pasienEmail}
              onChange={(e) => setForm({ ...form, pasienEmail: e.target.value })} placeholder="email@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tanggal</label>
              <input required type="date" value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
            </div>
            <InputField label="Tindakan / Layanan" required value={form.tindakan}
              onChange={(e) => setForm({ ...form, tindakan: e.target.value })} placeholder="cth: Scaling Gigi" />
          </div>
          <InputField label="Dokter" value={form.dokter}
            onChange={(e) => setForm({ ...form, dokter: e.target.value })} placeholder="drg. ..." />
          <TextArea label="Diagnosis" value={form.diagnosis}
            onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
            placeholder="Hasil diagnosis dokter..." rows={2} />
          <TextArea label="Resep & Catatan" value={form.resep}
            onChange={(e) => setForm({ ...form, resep: e.target.value })}
            placeholder="Resep obat, anjuran, catatan..." rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Biaya (Rp)" type="number" value={form.biaya}
              onChange={(e) => setForm({ ...form, biaya: e.target.value })} placeholder="250000" />
            <SelectField label="Status" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              options={[
                { value: "Selesai", label: "Selesai" },
                { value: "Dalam Perawatan", label: "Dalam Perawatan" },
                { value: "Perlu Kontrol", label: "Perlu Kontrol" },
              ]} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="secondary" onClick={closeForm}>Batal</Button>
            <Button type="primary">Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
