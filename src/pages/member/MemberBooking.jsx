import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { dokterService, janjiTemuService, pasienService, diskonService } from "../../services/supabaseService";

const LAYANAN_LIST = ["Konsultasi", "Scaling Gigi", "Tambal Komposit", "Cabut Gigi", "Odontektomi", "Kawat Gigi"];
const TIME_SLOTS   = Array.from({ length: 9 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

export default function MemberBooking() {
  const { MEMBER, totalPoin, tierMember } = useOutletContext() || {};
  const [doctorList, setDoctorList] = useState([]);
  const [promoList,  setPromoList]  = useState([]);
  const [bookForm, setBookForm] = useState({
    dokterNama: "", tanggal: new Date().toISOString().split("T")[0],
    jam: "", layanan: "", keluhan: "", kodePromo: "",
  });
  const [bookAlert,    setBookAlert]    = useState("");
  const [bookSaving,   setBookSaving]   = useState(false);
  const [promoValidasi, setPromoValidasi] = useState(null);

  useEffect(() => {
    dokterService.getAll().then(d => setDoctorList(d.filter(x => x.status === "Aktif"))).catch(() => {});
    diskonService.getAll().then(d => setPromoList(d.filter(x => x.status === "Aktif"))).catch(() => {});
  }, []);

  const handleCekPromo = () => {
    const kode = bookForm.kodePromo.trim().toUpperCase();
    if (!kode) { setPromoValidasi({ valid: false, pesan: "Masukkan kode promo." }); return; }
    const promo = promoList.find(p => p.kode === kode);
    if (promo) setPromoValidasi({ valid: true, pesan: `Promo "${promo.nama}" diterapkan!`, diskon: promo.diskon });
    else       setPromoValidasi({ valid: false, pesan: "Kode tidak valid atau tidak aktif." });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookSaving(true);
    try {
      // Auto-create pasien jika belum ada
      const semuaPasien = await pasienService.getAll();
      const sudahAda = semuaPasien.find(p => p.nama?.toLowerCase() === MEMBER?.nama?.toLowerCase());
      if (!sudahAda) {
        await pasienService.create({
          nama: MEMBER.nama, noHp: MEMBER.noHp || "", status: "Aktif",
          levelMembership: tierMember || "Bronze", sumber: "Member App",
        });
      }
      await janjiTemuService.create({
        pasienNama: MEMBER.nama, dokterNama: bookForm.dokterNama,
        tanggal: bookForm.tanggal, jam: bookForm.jam,
        layanan: bookForm.layanan, keluhan: bookForm.keluhan,
        status: "Menunggu", pasienEmail: MEMBER.email,
      });
      setBookAlert("✅ Janji temu berhasil dibuat! Status: Menunggu konfirmasi admin.");
      setBookForm({ dokterNama: "", tanggal: new Date().toISOString().split("T")[0], jam: "", layanan: "", keluhan: "", kodePromo: "" });
      setPromoValidasi(null);
    } catch {
      setBookAlert("❌ Gagal membuat janji temu. Coba lagi.");
    } finally {
      setBookSaving(false);
    }
    setTimeout(() => setBookAlert(""), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {bookAlert && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${bookAlert.startsWith("✅") ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
          {bookAlert}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-1">Booking Janji Temu</h3>
        <p className="text-sm text-gray-400 mb-5">Buat janji temu dengan dokter pilihan Anda</p>

        <form onSubmit={handleBooking} className="space-y-4">
          {/* Dokter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Pilih Dokter</label>
            <select required value={bookForm.dokterNama}
              onChange={e => setBookForm({ ...bookForm, dokterNama: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] bg-white">
              <option value="">-- Pilih Dokter --</option>
              {doctorList.map(d => <option key={d.id} value={d.nama}>{d.nama} - {d.spesialis}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Tanggal Janji</label>
              <input required type="date" value={bookForm.tanggal}
                onChange={e => setBookForm({ ...bookForm, tanggal: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Jam</label>
              <select required value={bookForm.jam}
                onChange={e => setBookForm({ ...bookForm, jam: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] bg-white">
                <option value="">-- Pilih Jam --</option>
                {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Jenis Layanan</label>
            <select required value={bookForm.layanan}
              onChange={e => setBookForm({ ...bookForm, layanan: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] bg-white">
              <option value="">-- Pilih Layanan --</option>
              {LAYANAN_LIST.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Keluhan</label>
            <textarea rows={3} value={bookForm.keluhan}
              onChange={e => setBookForm({ ...bookForm, keluhan: e.target.value })}
              placeholder="Deskripsikan keluhan Anda..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] resize-none" />
          </div>

          {/* Kode Promo */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Kode Promo <span className="text-gray-400 font-normal">(opsional)</span></label>
            <div className="flex gap-2">
              <input type="text" value={bookForm.kodePromo}
                onChange={e => { setBookForm({ ...bookForm, kodePromo: e.target.value.toUpperCase() }); setPromoValidasi(null); }}
                placeholder="Masukkan kode promo..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
              <button type="button" onClick={handleCekPromo}
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: "#f06b6b" }}>Cek</button>
            </div>
            {promoValidasi && (
              <div className={`mt-2 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${promoValidasi.valid ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                <span>{promoValidasi.valid ? "✅" : "❌"}</span>
                <span>{promoValidasi.pesan}</span>
                {promoValidasi.valid && <span className="ml-auto font-bold text-green-700">-{promoValidasi.diskon}%</span>}
              </div>
            )}
          </div>

          <button type="submit" disabled={bookSaving}
            className="w-full py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#f06b6b" }}>
            {bookSaving ? "Memproses..." : "Booking Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}
