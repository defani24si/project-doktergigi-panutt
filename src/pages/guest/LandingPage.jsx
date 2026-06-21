import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTooth, FaCalendarAlt, FaUserMd, FaShieldAlt, FaStar,
  FaWhatsapp, FaMapMarkerAlt, FaClock, FaPhone,
  FaChevronDown, FaChevronUp, FaArrowRight,
  FaInstagram, FaFacebook,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const DOCTORS = [
  { nama: "drg. Fikri", spesialis: "Dokter Gigi Umum", jadwal: "Senin – Jumat", avatar: "https://avatar.iran.liara.run/public/11" },
  { nama: "drg. Anisa", spesialis: "Periodonti", jadwal: "Selasa – Sabtu", avatar: "https://avatar.iran.liara.run/public/21" },
  { nama: "drg. Budi", spesialis: "Ortodonti", jadwal: "Senin – Rabu", avatar: "https://avatar.iran.liara.run/public/12" },
  { nama: "drg. Siti", spesialis: "Bedah Mulut", jadwal: "Kamis – Sabtu", avatar: "https://avatar.iran.liara.run/public/22" },
];

const SERVICES = [
  { icon: "🦷", nama: "Konsultasi Gigi", desc: "Pemeriksaan menyeluruh dan konsultasi dengan dokter spesialis.", harga: "Mulai Rp 75.000" },
  { icon: "✨", nama: "Scaling / Pembersihan", desc: "Membersihkan karang gigi untuk gigi sehat dan nafas segar.", harga: "Mulai Rp 150.000" },
  { icon: "🔧", nama: "Tambal Gigi", desc: "Penambalan komposit berwarna alami, tahan lama dan estetis.", harga: "Mulai Rp 200.000" },
  { icon: "😁", nama: "Pemutihan Gigi", desc: "Whitening profesional untuk senyum lebih cerah dan percaya diri.", harga: "Mulai Rp 500.000" },
  { icon: "🔩", nama: "Kawat Gigi", desc: "Behel metal dan ceramic untuk gigi rapi dan gigitan ideal.", harga: "Mulai Rp 4.000.000" },
  { icon: "⚕️", nama: "Cabut Gigi", desc: "Pencabutan gigi dengan prosedur aman, cepat, dan minim nyeri.", harga: "Mulai Rp 100.000" },
];

const TESTIMONIALS = [
  { nama: "Andi Pratama", rating: 5, kota: "Pekanbaru", teks: "Pelayanannya ramah banget, dokternya sabar menjelaskan. Scaling gigi saya terasa nyaman dan hasilnya bersih!", avatar: "https://avatar.iran.liara.run/public/31" },
  { nama: "Siti Rahayu", rating: 5, kota: "Duri", teks: "Sudah 3 tahun perawatan kawat gigi di sini. Hasilnya memuaskan dan dokternya profesional.", avatar: "https://avatar.iran.liara.run/public/42" },
  { nama: "Budi Santoso", rating: 5, kota: "Bangkinang", teks: "Tempat bersih, peralatan modern. Tambal gigi saya tidak terasa sakit sama sekali. Recommended!", avatar: "https://avatar.iran.liara.run/public/13" },
];

const FAQS = [
  { q: "Apakah perlu reservasi sebelum datang?", a: "Sangat disarankan untuk reservasi terlebih dahulu agar tidak menunggu lama. Anda bisa booking melalui tombol 'Buat Janji' di halaman ini." },
  { q: "Apakah klinik menerima BPJS?", a: "Saat ini kami belum bekerja sama dengan BPJS. Tersedia berbagai metode pembayaran: Cash, Transfer Bank, QRIS, dan E-Wallet." },
  { q: "Berapa lama waktu perawatan kawat gigi?", a: "Rata-rata 1,5 – 2 tahun tergantung kondisi gigi. Konsultasi gratis tersedia untuk mengetahui estimasi lebih akurat." },
  { q: "Apakah anak-anak bisa ditangani di sini?", a: "Ya, kami melayani pasien dari segala usia termasuk anak-anak. Dokter kami berpengalaman menangani pasien anak." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="font-sans text-gray-800">

      {/* ── HERO ── */}
      <section className="pt-16 pb-16 px-6" style={{ background: "linear-gradient(135deg, #fff5f5 0%, #fff 60%, #f0f9ff 100%)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#f06b6b] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <MdVerified /> Klinik Gigi Terpercaya Sejak 2015
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Senyum Sehat,<br />
              <span style={{ color: "#f06b6b" }}>Hidup Lebih</span> Bahagia
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Panutt Dental Clinic hadir dengan dokter gigi berpengalaman dan peralatan modern untuk memberikan perawatan terbaik bagi Anda dan keluarga.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/login"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 shadow-md"
                style={{ backgroundColor: "#f06b6b" }}>
                <FaCalendarAlt /> Pesan Sekarang
              </Link>
              <a href="#layanan"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-700 font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition">
                Lihat Layanan <FaArrowRight className="text-xs" />
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[["2.000+", "Pasien"], ["8+", "Dokter Spesialis"], ["10+", "Tahun Berpengalaman"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black" style={{ color: "#f06b6b" }}>{num}</p>
                  <p className="text-xs text-gray-500 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center shadow-2xl"
              style={{ background: "linear-gradient(135deg, #f06b6b, #c73030)" }}>
              <FaTooth className="text-white" style={{ fontSize: "140px", opacity: 0.9 }} />
            </div>
            {/* Floating badges */}
            <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-green-600 text-sm" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Aman & Steril</p>
                <p className="text-xs text-gray-400">ISO Certified</p>
              </div>
            </div>
            <div className="absolute bottom-8 left-0 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <FaStar className="text-yellow-500 text-sm" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Rating 4.9/5</p>
                <p className="text-xs text-gray-400">dari 500+ ulasan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEUNGGULAN ── */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaUserMd />, label: "Dokter Berpengalaman", desc: "Semua dokter bersertifikat resmi" },
              { icon: <FaShieldAlt />, label: "Alat Steril & Modern", desc: "Standar kebersihan tertinggi" },
              { icon: <FaClock />, label: "Jam Layanan Fleksibel", desc: "Buka Senin – Sabtu, 08:00 – 20:00" },
              { icon: <FaStar />, label: "Kepuasan Pasien", desc: "Rating 4.9/5 dari ribuan ulasan" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-3 p-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-[#f06b6b]"
                  style={{ backgroundColor: "#fff5f5" }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAYANAN ── */}
      <section id="layanan" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#f06b6b] mb-2">Layanan Kami</p>
            <h2 className="text-3xl font-black text-gray-900">Perawatan Gigi Lengkap</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">Dari pemeriksaan rutin hingga perawatan estetik, semua tersedia dalam satu klinik.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.nama} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition border border-gray-100 group">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{s.nama}</h3>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{s.desc}</p>
                <p className="text-sm font-semibold" style={{ color: "#f06b6b" }}>{s.harga}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOKTER ── */}
      <section id="dokter" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#f06b6b] mb-2">Tim Dokter</p>
            <h2 className="text-3xl font-black text-gray-900">Dokter Gigi Berpengalaman</h2>
            <p className="text-gray-500 mt-2">Ditangani langsung oleh dokter spesialis yang berdedikasi.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DOCTORS.map((d) => (
              <div key={d.nama} className="text-center group">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <img src={d.avatar} alt={d.nama}
                    className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{d.nama}</h3>
                <p className="text-xs text-[#f06b6b] font-medium mt-0.5">{d.spesialis}</p>
                <p className="text-xs text-gray-400 mt-1">{d.jadwal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="booking" className="py-16 px-6" style={{ background: "linear-gradient(135deg, #f06b6b, #c73030)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white">Buat Janji Temu Sekarang</h2>
            <p className="text-white/70 mt-2">Isi form di bawah, tim kami akan segera menghubungi Anda.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section id="testimoni" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#f06b6b] mb-2">Ulasan Pasien</p>
            <h2 className="text-3xl font-black text-gray-900">Apa Kata Mereka?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.nama} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.teks}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.nama} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.nama}</p>
                    <p className="text-xs text-gray-400">{t.kota}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#f06b6b] mb-2">FAQ</p>
            <h2 className="text-3xl font-black text-gray-900">Pertanyaan Umum</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-800 text-sm hover:bg-gray-50 transition"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  {openFaq === i ? <FaChevronUp className="text-[#f06b6b] flex-shrink-0 ml-2" /> : <FaChevronDown className="text-gray-400 flex-shrink-0 ml-2" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAK ── */}
      <section id="kontak" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#f06b6b] mb-2">Hubungi Kami</p>
            <h2 className="text-3xl font-black text-gray-900">Temukan Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <FaMapMarkerAlt className="text-[#f06b6b]" />, label: "Alamat", value: "Jl. Sudirman No. 12, Pekanbaru, Riau" },
              { icon: <FaPhone className="text-[#f06b6b]" />, label: "Telepon", value: "0812-3456-7890" },
              { icon: <FaClock className="text-[#f06b6b]" />, label: "Jam Buka", value: "Senin – Sabtu: 08:00 – 20:00" },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{c.label}</p>
                  <p className="font-semibold text-gray-800 text-sm mt-0.5">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center" style={{ backgroundColor: "#1a1a2e" }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f06b6b" }}>
            <FaTooth className="text-white text-sm" />
          </div>
          <p className="text-white font-bold">Panutt Dental Clinic</p>
        </div>
        <p className="text-gray-400 text-sm mb-4">Kesehatan gigi Anda adalah prioritas kami.</p>
        <div className="flex justify-center gap-4 mb-5">
          {[FaInstagram, FaFacebook, FaWhatsapp].map((Icon, i) => (
            <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#f06b6b] transition">
              <Icon className="text-sm" />
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-xs">© 2026 Panutt Dental Clinic. All rights reserved.</p>
      </footer>

      {/* Floating WA Button */}
      <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl transition z-50">
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
}

// ── Booking Form Component ──
function BookingForm() {
  const DOKTER_LIST = ["drg. Fikri (Umum)", "drg. Anisa (Periodonti)", "drg. Budi (Ortodonti)", "drg. Siti (Bedah Mulut)"];
  const LAYANAN_LIST = ["Konsultasi", "Scaling Gigi", "Tambal Gigi", "Pemutihan Gigi", "Kawat Gigi", "Cabut Gigi"];

  const [form, setForm] = useState({ nama: "", noHp: "", dokter: "", layanan: "", tanggal: "", keluhan: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Janji Temu Berhasil Dikirim!</h3>
        <p className="text-gray-500 text-sm mb-1">Halo <strong>{form.nama}</strong>, permintaan janji temu Anda sudah kami terima.</p>
        <p className="text-gray-400 text-sm mb-6">Tim kami akan menghubungi <strong>{form.noHp}</strong> untuk konfirmasi jadwal.</p>
        <button
          onClick={() => { setForm({ nama: "", noHp: "", dokter: "", layanan: "", tanggal: "", keluhan: "" }); setSubmitted(false); }}
          className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ backgroundColor: "#f06b6b" }}
        >
          Buat Janji Lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })}
            placeholder="Nama Anda"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nomor HP / WhatsApp</label>
          <input required value={form.noHp} onChange={(e) => setForm({ ...form, noHp: e.target.value })}
            placeholder="08xxxxxxxxxx"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Pilih Dokter</label>
          <select required value={form.dokter} onChange={(e) => setForm({ ...form, dokter: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f06b6b]">
            <option value="">-- Pilih Dokter --</option>
            {DOKTER_LIST.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Jenis Layanan</label>
          <select required value={form.layanan} onChange={(e) => setForm({ ...form, layanan: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f06b6b]">
            <option value="">-- Pilih Layanan --</option>
            {LAYANAN_LIST.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Tanggal yang Diinginkan</label>
        <input required type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
          min={new Date().toISOString().split("T")[0]}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Keluhan (opsional)</label>
        <textarea rows={3} value={form.keluhan} onChange={(e) => setForm({ ...form, keluhan: e.target.value })}
          placeholder="Ceritakan keluhan gigi Anda..."
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] resize-none" />
      </div>
      <button type="submit"
        className="w-full py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
        style={{ backgroundColor: "#f06b6b" }}>
        <FaCalendarAlt /> Kirim Permintaan Janji
      </button>
    </form>
  );
}
