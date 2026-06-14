import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";

const DOKTER_LIST = [
  { nama: "drg. Fikri (Umum)", jadwal: "Senin – Jumat, 08:00 – 16:00" },
  { nama: "drg. Anisa (Periodonti)", jadwal: "Selasa – Sabtu, 09:00 – 17:00" },
  { nama: "drg. Budi (Ortodonti)", jadwal: "Senin – Rabu, 10:00 – 16:00" },
  { nama: "drg. Siti (Bedah Mulut)", jadwal: "Kamis – Sabtu, 08:00 – 14:00" },
  { nama: "drg. Andi (Konservasi)", jadwal: "Senin – Jumat, 13:00 – 20:00" },
];

const LAYANAN_LIST = [
  "Konsultasi Gigi", "Scaling / Pembersihan", "Tambal Gigi Komposit",
  "Pemutihan Gigi", "Kawat Gigi (Behel)", "Cabut Gigi",
  "Pemasangan Crown", "Odontektomi",
];

const JAM_LIST = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const STEPS = ["Data Diri", "Pilih Jadwal", "Konfirmasi"];

export default function BookingGuest() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nama: "", noHp: "", email: "", umur: "",
    dokter: "", layanan: "", tanggal: "", jam: "", keluhan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [kodeBooking] = useState(() => "BK" + Math.random().toString(36).substr(2, 6).toUpperCase());

  const nextStep = (e) => { e.preventDefault(); setStep((s) => s + 1); };
  const prevStep = () => setStep((s) => s - 1);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h2 className="text-xl font-black text-gray-800 mb-2">Janji Temu Berhasil!</h2>
          <p className="text-gray-500 text-sm mb-5">
            Terima kasih <strong>{form.nama}</strong>, permintaan janji temu Anda telah diterima. Tim kami akan menghubungi <strong>{form.noHp}</strong> untuk konfirmasi.
          </p>

          {/* Kode Booking */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-5">
            <p className="text-xs text-gray-500 mb-1">Kode Booking Anda</p>
            <p className="text-2xl font-black tracking-widest" style={{ color: "#f06b6b" }}>{kodeBooking}</p>
            <p className="text-xs text-gray-400 mt-1">Simpan kode ini untuk cek status janji temu</p>
          </div>

          {/* Ringkasan */}
          <div className="text-left space-y-2 bg-gray-50 rounded-2xl p-4 mb-6 text-sm">
            {[
              ["Dokter", form.dokter],
              ["Layanan", form.layanan],
              ["Tanggal", form.tanggal],
              ["Jam", form.jam],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold text-gray-800">{val}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link to="/guest/cek-status"
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition text-center">
              Cek Status
            </Link>
            <Link to="/guest"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 text-center"
              style={{ backgroundColor: "#f06b6b" }}>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900">Buat Janji Temu</h1>
          <p className="text-gray-500 text-sm mt-1">Isi form berikut untuk memesan jadwal dengan dokter pilihan Anda.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  i < step ? "bg-green-500 text-white" : i === step ? "text-white" : "bg-gray-200 text-gray-400"
                }`} style={i === step ? { backgroundColor: "#f06b6b" } : {}}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-medium ${i === step ? "text-[#f06b6b]" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-16 h-0.5 mb-4 mx-1 ${i < step ? "bg-green-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

          {/* ── STEP 0: Data Diri ── */}
          {step === 0 && (
            <form onSubmit={nextStep} className="space-y-4">
              <h2 className="font-bold text-gray-800 mb-4">Data Diri Pasien</h2>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Nama lengkap Anda"
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Nomor HP / WhatsApp</label>
                <input required value={form.noHp} onChange={(e) => setForm({ ...form, noHp: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Email (opsional)</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@contoh.com"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Usia</label>
                  <input type="number" value={form.umur} onChange={(e) => setForm({ ...form, umur: e.target.value })}
                    placeholder="Tahun"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
                </div>
              </div>
              <button type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-2 transition hover:opacity-90"
                style={{ backgroundColor: "#f06b6b" }}>
                Lanjut →
              </button>
            </form>
          )}

          {/* ── STEP 1: Pilih Jadwal ── */}
          {step === 1 && (
            <form onSubmit={nextStep} className="space-y-4">
              <h2 className="font-bold text-gray-800 mb-4">Pilih Jadwal</h2>

              {/* Pilih Dokter */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Pilih Dokter</label>
                <div className="space-y-2">
                  {DOKTER_LIST.map((d) => (
                    <label key={d.nama}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${form.dokter === d.nama ? "border-[#f06b6b] bg-red-50" : "border-gray-200 hover:bg-gray-50"}`}>
                      <input type="radio" name="dokter" value={d.nama} required
                        checked={form.dokter === d.nama}
                        onChange={(e) => setForm({ ...form, dokter: e.target.value })}
                        className="accent-[#f06b6b]" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{d.nama}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <FaClock className="text-gray-400" /> {d.jadwal}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Jenis Layanan</label>
                <select required value={form.layanan} onChange={(e) => setForm({ ...form, layanan: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f06b6b]">
                  <option value="">-- Pilih Layanan --</option>
                  {LAYANAN_LIST.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Tanggal</label>
                  <input required type="date" value={form.tanggal}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Jam</label>
                  <select required value={form.jam} onChange={(e) => setForm({ ...form, jam: e.target.value })}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f06b6b]">
                    <option value="">-- Pilih --</option>
                    {JAM_LIST.map((j) => <option key={j} value={j}>{j}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Keluhan (opsional)</label>
                <textarea rows={3} value={form.keluhan} onChange={(e) => setForm({ ...form, keluhan: e.target.value })}
                  placeholder="Ceritakan keluhan gigi Anda..."
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] resize-none" />
              </div>

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={prevStep}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                  ← Kembali
                </button>
                <button type="submit"
                  className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90"
                  style={{ backgroundColor: "#f06b6b" }}>
                  Lanjut →
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: Konfirmasi ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-bold text-gray-800 mb-4">Konfirmasi Janji Temu</h2>

              <div className="bg-gray-50 rounded-2xl p-4 space-y-3 text-sm">
                <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">Data Pasien</p>
                {[["Nama", form.nama], ["No. HP", form.noHp], ["Email", form.email || "-"], ["Usia", form.umur ? `${form.umur} tahun` : "-"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-gray-500">{l}</span>
                    <span className="font-semibold text-gray-800">{v}</span>
                  </div>
                ))}
                <hr className="border-gray-200" />
                <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">Jadwal</p>
                {[["Dokter", form.dokter], ["Layanan", form.layanan], ["Tanggal", form.tanggal], ["Jam", form.jam]].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-gray-500">{l}</span>
                    <span className="font-semibold text-gray-800">{v}</span>
                  </div>
                ))}
                {form.keluhan && (
                  <>
                    <hr className="border-gray-200" />
                    <div>
                      <p className="text-gray-500 mb-1">Keluhan</p>
                      <p className="text-gray-700 text-xs leading-relaxed">{form.keluhan}</p>
                    </div>
                  </>
                )}
              </div>

              <p className="text-xs text-gray-400 text-center">
                Dengan menekan "Kirim Janji", Anda menyetujui bahwa data yang diisi adalah benar.
              </p>

              <div className="flex gap-3">
                <button type="button" onClick={prevStep}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                  ← Kembali
                </button>
                <button type="submit"
                  className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#f06b6b" }}>
                  <FaCalendarAlt /> Kirim Janji
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
