import { useState, useMemo, useRef, useEffect } from "react";
import { FaPlus, FaSearch, FaCalendarDay } from "react-icons/fa";
import { useClinic } from "../../context/useClinic";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import SelectField from "../../components/SelectField";
import TextArea from "../../components/TextArea";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import Checkbox from "../../components/Checkbox";
import { DatePicker } from "../../components/ui/date-picker";
import { janjiTemuService } from "../../services/supabaseService";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../components/ui/alert-dialog";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const LAYANAN_LIST = [
  "Konsultasi", "Scaling Gigi", "Tambal Komposit",
  "Cabut Gigi", "Odontektomi", "Kawat Gigi",
];

const TIME_SLOTS = Array.from({ length: 9 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

const STATUS_BADGE = {
  Menunggu: "warning",
  Selesai: "success",
  Dibatalkan: "danger",
};

export default function JanjiTemu() {
  const { appointments, patients, doctors, refreshAppointments } = useClinic();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");
  const [reminderChecked, setReminderChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [cancelTargetId, setCancelTargetId] = useState(null);
  const [form, setForm] = useState({
    pasienId: "", dokterNama: "",
    tanggal: new Date().toISOString().split("T")[0],
    jam: "", layanan: "", keluhan: "",
  });

  const searchRef = useRef(null);
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const pasienSelectRef = useRef(null);
  useEffect(() => {
    if (showForm && pasienSelectRef.current) {
      pasienSelectRef.current.focus();
    }
  }, [showForm]);

  const totalMenunggu = appointments.filter((a) => a.status === "Menunggu").length;
  const totalSelesai = appointments.filter((a) => a.status === "Selesai").length;

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((apt) => {
        const pasienName = apt.pasien_nama || apt.pasienNama || '';
        const dokterName = apt.dokter_nama || apt.dokterNama || '';
        const matchSearch =
          pasienName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dokterName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === "Semua" || apt.status === filterStatus;
        const matchDate = filterTanggal === "" || apt.tanggal === filterTanggal;
        return matchSearch && matchStatus && matchDate;
      })
      .sort((a, b) => a.tanggal === b.tanggal ? a.jam.localeCompare(b.jam) : a.tanggal.localeCompare(b.tanggal));
  }, [appointments, searchTerm, filterStatus, filterTanggal]);

  const getAvailableSlots = (tanggal, dokter) => {
    const booked = appointments
      .filter((apt) => apt.tanggal === tanggal && apt.dokterNama === dokter && apt.status !== "Dibatalkan")
      .map((apt) => apt.jam);
    return TIME_SLOTS.map((slot) => ({ time: slot, isAvailable: !booked.includes(slot) }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const pasien = patients.find((p) => p.id === form.pasienId);
    const newAppt = {
      pasienNama: pasien ? pasien.nama : "Unknown",
      dokterNama: form.dokterNama,
      tanggal: form.tanggal,
      jam: form.jam,
      layanan: form.layanan,
      keluhan: form.keluhan,
      status: "Menunggu",
    };
    try {
      await janjiTemuService.create(newAppt);
      await refreshAppointments();
      setSuccessAlert(`Janji temu untuk ${newAppt.pasienNama} berhasil dibuat.`);

      // Kirim pengingat via WhatsApp jika dicentang
      if (reminderChecked && pasien?.noHp) {
        kirimPengingatWA(pasien, newAppt);
      } else if (reminderChecked && !pasien?.noHp) {
        alert("Pengingat tidak dapat dikirim: nomor HP pasien belum terisi.");
      }

      setShowForm(false);
      setReminderChecked(false);
      setForm({ pasienId: "", dokterNama: "", tanggal: new Date().toISOString().split("T")[0], jam: "", layanan: "", keluhan: "" });
    } catch (err) {
      console.error("Gagal buat janji temu:", err);
      alert("Gagal membuat janji temu. Cek koneksi database.");
    }
    setTimeout(() => setSuccessAlert(""), 4000);
  };

  // Buka WhatsApp dengan pesan pengingat yang sudah terisi
  const kirimPengingatWA = (pasien, appt) => {
    // Normalisasi nomor: 08xxx -> 628xxx
    let nomor = (pasien.noHp || "").replace(/\D/g, "");
    if (nomor.startsWith("0")) nomor = "62" + nomor.slice(1);

    const pesan =
      `Halo ${pasien.nama}, ini pengingat janji temu Anda di Panutt Dental Clinic:\n\n` +
      `🦷 Layanan: ${appt.layanan}\n` +
      `👨‍⚕️ Dokter: ${appt.dokterNama}\n` +
      `📅 Tanggal: ${appt.tanggal}\n` +
      `⏰ Jam: ${appt.jam}\n\n` +
      `Mohon datang 10 menit lebih awal. Terima kasih.`;

    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  };

  const updateStatus = async (uuid, newStatus) => {
    try {
      await janjiTemuService.updateStatus(uuid, newStatus);
      await refreshAppointments();
    } catch (err) {
      console.error("Gagal update status:", err);
      alert("Gagal mengubah status janji temu.");
    }
  };

  const handleCancelConfirm = () => {
    if (cancelTargetId) {
      updateStatus(cancelTargetId, "Dibatalkan");
      setCancelTargetId(null);
    }
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Page Header */}
      <PageHeader title="Janji Temu" breadcrumb={["Jadwal"]}>
        <Button type="primary" icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Buat Janji
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center text-xl">
              <FaCalendarDay />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Menunggu</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalMenunggu}</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl">
              <FaCalendarDay />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Selesai</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalSelesai}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
            <InputField
              placeholder="Cari pasien / dokter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<FaSearch />}
              inputRef={searchRef}
            />
            <SelectField
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: "Semua", label: "Semua Status" },
                { value: "Menunggu", label: "Menunggu" },
                { value: "Selesai", label: "Selesai" },
                { value: "Dibatalkan", label: "Dibatalkan" },
              ]}
            />
            {/* shadcn DatePicker — filter tanggal */}
            <DatePicker
              date={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setFilterTanggal(date ? format(date, "yyyy-MM-dd") : "");
              }}
              placeholder="Filter tanggal..."
              locale={localeId}
              className="h-[38px] text-sm text-gray-600 border-gray-300"
            />
            {filterTanggal && (
              <button
                onClick={() => { setFilterTanggal(""); setSelectedDate(undefined); }}
                className="text-xs text-[#f06b6b] hover:underline font-medium"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table headers={["ID", "Pasien", "Dokter", "Tgl & Jam", "Layanan", "Status", "Aksi"]}>
          {filteredAppointments.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-8 text-center text-gray-400">
                Tidak ada jadwal ditemukan.
              </td>
            </tr>
          ) : (
            filteredAppointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-gray-50 transition text-sm">
                <td className="px-4 py-4 font-medium text-gray-600">{apt.janji_id || apt.id}</td>
                <td className="px-4 py-4 font-semibold text-gray-800">{apt.pasien_nama || apt.pasienNama}</td>
                <td className="px-4 py-4 text-gray-600">{apt.dokter_nama || apt.dokterNama}</td>
                <td className="px-4 py-4 text-gray-600">
                  <span className="font-medium">{apt.tanggal}</span>
                  <p className="text-xs text-gray-400 flex items-center mt-1">
                    <FaCalendarDay className="mr-1" /> {apt.jam}
                  </p>
                </td>
                <td className="px-4 py-4 text-gray-600">{apt.layanan}</td>
                <td className="px-4 py-4">
                  <Badge type={STATUS_BADGE[apt.status]}>{apt.status}</Badge>
                </td>
                <td className="px-4 py-4 text-center">
                  {apt.status === "Menunggu" ? (
                    <div className="flex items-center justify-center gap-2">
                      {/* Selesai langsung */}
                      <button
                        onClick={() => updateStatus(apt.uuid, "Selesai")}
                        className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition whitespace-nowrap"
                      >
                        ✓ Selesai
                      </button>

                      {/* Batalkan pakai AlertDialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => setCancelTargetId(apt.uuid)}
                            className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-500 border border-red-200 rounded-lg hover:bg-red-100 transition whitespace-nowrap"
                          >
                            ✕ Batalkan
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Batalkan Janji Temu?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Janji temu <strong>{apt.pasien_nama || apt.pasienNama}</strong> dengan <strong>{apt.dokter_nama || apt.dokterNama}</strong> pada{" "}
                              <strong>{apt.tanggal} pukul {apt.jam}</strong> akan dibatalkan. Tindakan ini tidak dapat diurungkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Tidak, Kembali</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={handleCancelConfirm}
                            >
                              Ya, Batalkan
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </Table>
      </Card>

      {/* Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Buat Janji Temu Baru">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Pilih Pasien"
              value={form.pasienId}
              onChange={(e) => setForm({ ...form, pasienId: e.target.value })}
              options={[
                { value: "", label: "-- Pilih Pasien --" },
                ...patients.map((p) => ({ value: p.id, label: `${p.id} - ${p.nama}` })),
              ]}
              selectRef={pasienSelectRef}
            />
            <SelectField
              label="Pilih Dokter"
              value={form.dokterNama}
              onChange={(e) => setForm({ ...form, dokterNama: e.target.value, jam: "" })}
              options={[
                { value: "", label: "-- Pilih Dokter --" },
                ...doctors
                  .filter((d) => d.status === "Aktif")
                  .map((d) => ({ value: d.nama, label: `${d.nama} - ${d.spesialis}` })),
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tanggal Janji</label>
              <input
                required
                type="date"
                value={form.tanggal}
                onChange={(e) => {
                  setForm({ ...form, tanggal: e.target.value, jam: "" });
                  setSelectedDate(e.target.value ? new Date(e.target.value) : new Date());
                }}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Jam</label>
              <select
                required
                value={form.jam}
                onChange={(e) => setForm({ ...form, jam: e.target.value })}
                disabled={!form.tanggal || !form.dokterNama}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] bg-white disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="" disabled>{form.dokterNama ? "-- Pilih Waktu --" : "Pilih dokter dulu"}</option>
                {form.tanggal && form.dokterNama && getAvailableSlots(form.tanggal, form.dokterNama).map((slot) => (
                  <option key={slot.time} value={slot.time} disabled={!slot.isAvailable}>
                    {slot.time} {slot.isAvailable ? "" : "(Penuh)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <SelectField
            label="Jenis Layanan"
            value={form.layanan}
            onChange={(e) => setForm({ ...form, layanan: e.target.value })}
            options={LAYANAN_LIST.map((l) => ({ value: l, label: l }))}
          />

          <TextArea
            label="Keluhan Pasien"
            value={form.keluhan}
            onChange={(e) => setForm({ ...form, keluhan: e.target.value })}
            placeholder="Deskripsikan keluhan pasien..."
            rows={3}
          />

          <Checkbox
            label="Kirim pengingat ke pasien"
            checked={reminderChecked}
            onChange={(e) => setReminderChecked(e.target.checked)}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="secondary" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="primary">Booking Jadwal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
