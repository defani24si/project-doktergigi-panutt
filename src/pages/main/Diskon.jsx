import { useState } from "react";
import { FaTag, FaPlus, FaTrash, FaPercent, FaToggleOn, FaToggleOff, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import Alert from "../../components/Alert";

const INITIAL_PROMOS = [
  { id: 1, kode: "GIGI10", nama: "Diskon Scaling 10%", diskon: 10, minBeli: 150000, berlakuHingga: "2026-08-31", status: "Aktif" },
  { id: 2, kode: "NEWMEMBER", nama: "Member Baru 20%", diskon: 20, minBeli: 0, berlakuHingga: "2026-07-31", status: "Aktif" },
  { id: 3, kode: "LEBARAN25", nama: "Promo Lebaran 25%", diskon: 25, minBeli: 200000, berlakuHingga: "2026-04-10", status: "Tidak Aktif" },
];

const EMPTY_FORM = { kode: "", nama: "", diskon: "", minBeli: "", berlakuHingga: "" };

const GRADIENT_LIST = [
  "from-red-400 to-rose-500",
  "from-orange-400 to-amber-500",
  "from-pink-400 to-fuchsia-500",
  "from-blue-400 to-indigo-500",
  "from-teal-400 to-cyan-500",
];

export default function Diskon() {
  const [promos, setPromos] = useState(INITIAL_PROMOS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [successAlert, setSuccessAlert] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const newPromo = {
      id: promos.length + 1,
      ...form,
      diskon: Number(form.diskon),
      minBeli: Number(form.minBeli),
      status: "Aktif",
    };
    setPromos([...promos, newPromo]);
    setSuccessAlert(`Promo "${form.nama}" berhasil ditambahkan.`);
    setShowForm(false);
    setForm(EMPTY_FORM);
    setTimeout(() => setSuccessAlert(""), 4000);
  };

  const handleDelete = (id) => setPromos(promos.filter((p) => p.id !== id));

  const toggleStatus = (id) => {
    setPromos(promos.map((p) =>
      p.id === id ? { ...p, status: p.status === "Aktif" ? "Tidak Aktif" : "Aktif" } : p
    ));
  };

  const totalAktif = promos.filter((p) => p.status === "Aktif").length;

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Diskon & Promo" breadcrumb={["Marketing"]}>
        <Button type="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Promo
        </Button>
      </PageHeader>

      {successAlert && (
        <div className="mb-4">
          <Alert type="success" onClose={() => setSuccessAlert("")}>{successAlert}</Alert>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-[#f06b6b] rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <FaTag />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Promo</p>
              <h3 className="text-2xl font-bold text-gray-800">{promos.length}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Semua promo terdaftar</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <FaPercent />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Promo Aktif</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalAktif}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Sedang berjalan</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <FaTag />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Tidak Aktif</p>
              <h3 className="text-2xl font-bold text-gray-800">{promos.length - totalAktif}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Sudah berakhir</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Promo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {promos.map((p, i) => (
          <div
            key={p.id}
            className={`relative rounded-2xl overflow-hidden shadow-md ${p.status === "Tidak Aktif" ? "opacity-60" : ""}`}
          >
            {/* Card Header — gradient */}
            <div className={`bg-gradient-to-br ${GRADIENT_LIST[i % GRADIENT_LIST.length]} px-5 pt-5 pb-8`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {p.status === "Aktif" ? "🟢 Aktif" : "⛔ Nonaktif"}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight">{p.nama}</h3>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <span className="text-white font-black text-4xl">{p.diskon}%</span>
                  <p className="text-white/70 text-xs">diskon</p>
                </div>
              </div>
            </div>

            {/* Notch / coupon cut */}
            <div className="relative bg-white">
              <div className="absolute -top-3 left-4 right-4 flex justify-between">
                <div className="w-6 h-6 rounded-full bg-gray-100" />
                <div className="flex-1 border-t-2 border-dashed border-gray-200 mt-3 mx-2" />
                <div className="w-6 h-6 rounded-full bg-gray-100" />
              </div>
            </div>

            {/* Card Body */}
            <div className="bg-white px-5 pt-4 pb-4 rounded-b-2xl border border-t-0 border-gray-100">
              {/* Kode Promo */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Kode Promo</span>
                <span className="font-mono font-black text-gray-800 text-sm tracking-widest bg-gray-100 px-3 py-1 rounded-lg">
                  {p.kode}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaShoppingCart className="text-gray-400" />
                  Min. pembelian: <span className="font-medium text-gray-700">
                    {p.minBeli > 0 ? `Rp ${p.minBeli.toLocaleString("id-ID")}` : "Tanpa minimum"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaCalendarAlt className="text-gray-400" />
                  Berlaku hingga: <span className="font-medium text-gray-700">{p.berlakuHingga}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => toggleStatus(p.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition ${
                    p.status === "Aktif"
                      ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  {p.status === "Aktif" ? <FaToggleOff /> : <FaToggleOn />}
                  {p.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-2 text-xs font-semibold bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Tambah Promo Card */}
        <button
          onClick={() => setShowForm(true)}
          className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#f06b6b] hover:bg-red-50 transition-all flex flex-col items-center justify-center gap-2 min-h-[200px] group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#f06b6b] flex items-center justify-center transition-all">
            <FaPlus className="text-gray-400 group-hover:text-white transition-all" />
          </div>
          <p className="text-sm font-medium text-gray-400 group-hover:text-[#f06b6b] transition-all">Tambah Promo Baru</p>
        </button>
      </div>

      {/* Modal Tambah Promo */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Tambah Promo Baru">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Kode Promo" placeholder="cth: GIGI10" value={form.kode}
              onChange={(e) => setForm({ ...form, kode: e.target.value.toUpperCase() })} />
            <InputField label="Diskon (%)" type="number" placeholder="cth: 10" value={form.diskon}
              onChange={(e) => setForm({ ...form, diskon: e.target.value })} />
          </div>
          <InputField label="Nama Promo" placeholder="cth: Diskon Scaling 10%" value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Min. Pembelian (Rp)" type="number" placeholder="0 = tanpa min." value={form.minBeli}
              onChange={(e) => setForm({ ...form, minBeli: e.target.value })} />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Berlaku Hingga</label>
              <input required type="date" value={form.berlakuHingga}
                onChange={(e) => setForm({ ...form, berlakuHingga: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="secondary" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="primary">Simpan Promo</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
