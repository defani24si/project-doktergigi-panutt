import { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaPlus, FaTrash, FaPaperPlane, FaRobot, FaBolt, FaToggleOn, FaToggleOff } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

const INITIAL_AUTOMATIONS = [
  {
    id: 1,
    nama: "Reminder Janji Temu",
    channel: "WhatsApp",
    trigger: "H-1 sebelum janji temu",
    pesan: "Halo {nama_pasien}, mengingatkan janji temu Anda besok pada pukul {jam} dengan {dokter}. Harap datang tepat waktu. 😊",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Ucapan Selamat Datang",
    channel: "Email",
    trigger: "Pasien baru terdaftar",
    pesan: "Selamat datang di Panutt Dental Clinic, {nama_pasien}! Kami siap memberikan pelayanan terbaik untuk kesehatan gigi Anda.",
    status: "Aktif",
  },
  {
    id: 3,
    nama: "Follow-up Setelah Perawatan",
    channel: "WhatsApp",
    trigger: "H+1 setelah selesai",
    pesan: "Halo {nama_pasien}, bagaimana kondisi setelah perawatan kemarin? Jika ada keluhan, jangan ragu menghubungi kami.",
    status: "Tidak Aktif",
  },
];

const EMPTY_FORM = { nama: "", channel: "WhatsApp", trigger: "", pesan: "" };

const CHANNEL_CONFIG = {
  WhatsApp: { bg: "bg-green-500", light: "bg-green-50", text: "text-green-600", border: "border-green-200", icon: FaWhatsapp },
  Email: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", icon: FaEnvelope },
};

export default function ServiceAutomation() {
  const [automations, setAutomations] = useState(INITIAL_AUTOMATIONS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [successAlert, setSuccessAlert] = useState("");
  const [testAlert, setTestAlert] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const newAuto = { id: automations.length + 1, ...form, status: "Aktif" };
    setAutomations([...automations, newAuto]);
    setSuccessAlert(`Automation "${form.nama}" berhasil dibuat.`);
    setShowForm(false);
    setForm(EMPTY_FORM);
    setTimeout(() => setSuccessAlert(""), 4000);
  };

  const handleDelete = (id) => setAutomations(automations.filter((a) => a.id !== id));

  const toggleStatus = (id) => {
    setAutomations(automations.map((a) =>
      a.id === id ? { ...a, status: a.status === "Aktif" ? "Tidak Aktif" : "Aktif" } : a
    ));
  };

  const handleTest = (item) => {
    setTestAlert(`Pesan test "${item.nama}" berhasil dikirim via ${item.channel}!`);
    setTimeout(() => setTestAlert(""), 4000);
  };

  const totalAktif = automations.filter((a) => a.status === "Aktif").length;

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Service Automation" breadcrumb={["Marketing"]}>
        <Button type="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Buat Automation
        </Button>
      </PageHeader>

      {successAlert && (
        <div className="mb-4">
          <Alert type="success" onClose={() => setSuccessAlert("")}>{successAlert}</Alert>
        </div>
      )}
      {testAlert && (
        <div className="mb-4">
          <Alert type="success" onClose={() => setTestAlert("")}>{testAlert}</Alert>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-[#f06b6b] rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <FaRobot />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Automation</p>
              <h3 className="text-2xl font-bold text-gray-800">{automations.length}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{totalAktif} sedang aktif</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <FaWhatsapp />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">WhatsApp</p>
              <h3 className="text-2xl font-bold text-gray-800">{automations.filter((a) => a.channel === "WhatsApp").length}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Automation via WA</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Email</p>
              <h3 className="text-2xl font-bold text-gray-800">{automations.filter((a) => a.channel === "Email").length}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Automation via Email</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Automation List */}
      <div className="space-y-4">
        {automations.map((item, idx) => {
          const cfg = CHANNEL_CONFIG[item.channel] || CHANNEL_CONFIG.WhatsApp;
          const Icon = cfg.icon;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                item.status === "Tidak Aktif" ? "opacity-60 border-gray-200" : "border-gray-100"
              }`}
            >
              {/* Top bar warna channel */}
              <div className={`h-1 w-full ${cfg.bg}`} />

              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Kiri */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Nomor + ikon */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className={`w-11 h-11 ${cfg.bg} rounded-2xl flex items-center justify-center shadow-sm`}>
                        <Icon className="text-white text-lg" />
                      </div>
                      <span className="text-xs text-gray-300 font-mono">#{String(idx + 1).padStart(2, "0")}</span>
                    </div>

                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{item.nama}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${cfg.light} ${cfg.text}`}>
                          {item.channel}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          item.status === "Aktif" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                        }`}>
                          {item.status === "Aktif" ? "● Aktif" : "○ Nonaktif"}
                        </span>
                      </div>

                      {/* Trigger */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <FaBolt className="text-yellow-400 text-xs" />
                        <span className="text-xs text-gray-500">Trigger:</span>
                        <span className="text-xs font-semibold text-gray-700 bg-yellow-50 px-2 py-0.5 rounded-full">{item.trigger}</span>
                      </div>

                      {/* Pesan */}
                      <div className={`${cfg.light} ${cfg.border} border rounded-xl px-4 py-3`}>
                        <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wide">Isi Pesan</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.pesan}</p>
                      </div>
                    </div>
                  </div>

                  {/* Kanan: Tombol aksi */}
                  <div className="flex md:flex-col gap-2 flex-shrink-0 md:w-32">
                    <button
                      onClick={() => handleTest(item)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition ${cfg.light} ${cfg.text} border ${cfg.border} hover:opacity-80`}
                    >
                      <FaPaperPlane className="text-xs" /> Test Kirim
                    </button>
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition ${
                        item.status === "Aktif"
                          ? "bg-yellow-50 text-yellow-600 border border-yellow-200 hover:bg-yellow-100"
                          : "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                      }`}
                    >
                      {item.status === "Aktif" ? <FaToggleOff /> : <FaToggleOn />}
                      {item.status === "Aktif" ? "Nonaktif" : "Aktifkan"}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition"
                    >
                      <FaTrash className="text-xs" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {automations.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <FaRobot className="mx-auto text-5xl mb-3 opacity-20" />
            <p className="font-medium">Belum ada automation</p>
            <p className="text-sm mt-1">Klik "Buat Automation" untuk memulai</p>
          </div>
        )}
      </div>

      {/* Modal Buat Automation */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Buat Automation Baru">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nama Automation</label>
            <input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="cth: Reminder Janji Temu"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Channel</label>
              <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] bg-white">
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Trigger</label>
              <input required value={form.trigger} onChange={(e) => setForm({ ...form, trigger: e.target.value })}
                placeholder="cth: H-1 sebelum janji"
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Isi Pesan</label>
            <p className="text-xs text-gray-400 mb-1">Gunakan: {"{nama_pasien}"}, {"{jam}"}, {"{dokter}"}</p>
            <textarea required rows={4} value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              placeholder="Tulis isi pesan otomatis..."
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="secondary" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="primary">Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
