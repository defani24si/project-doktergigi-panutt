import { useOutletContext } from "react-router-dom";
import { FaTooth, FaCalendarAlt, FaUserMd, FaHistory } from "react-icons/fa";

export default function MemberKesehatan() {
  const { catatanList = [] } = useOutletContext() || {};

  if (catatanList.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#fde8e8" }}>
            <FaTooth className="text-2xl" style={{ color: "#f06b6b" }} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Belum Ada Riwayat Kesehatan</h3>
          <p className="text-sm text-gray-400 mb-1">Catatan medis akan muncul di sini setelah</p>
          <p className="text-sm text-gray-400 mb-5">Anda melakukan kunjungan ke Panutt Dental Clinic.</p>
          <a href="/member/booking"
            className="inline-block px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90"
            style={{ backgroundColor: "#f06b6b" }}>
            Booking Janji Sekarang
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {catatanList.map((r, i) => {
        const tindakan  = r.tindakan  || "-";
        const tanggal   = r.tanggal   || "-";
        const dokter    = r.dokter    || "-";
        const status    = r.status    || "Selesai";
        const biaya     = Number(r.biaya || 0);
        const diagnosis = r.diagnosis || "-";
        const resep     = r.resep     || "-";

        return (
          <div key={r.id || i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f06b6b" }}>
                  <FaTooth className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{tindakan}</h3>
                  <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><FaCalendarAlt className="text-gray-400" /> {tanggal}</span>
                    <span className="flex items-center gap-1"><FaUserMd className="text-gray-400" /> {dokter}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-50 text-green-600">{status}</span>
                <p className="font-black mt-1" style={{ color: "#f06b6b" }}>Rp {biaya.toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 rounded-xl px-4 py-3">
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Diagnosis</p>
                <p className="text-sm text-gray-700">{diagnosis}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Resep & Catatan</p>
                <p className="text-sm text-gray-700">{resep}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => alert("Invoice akan diunduh (fitur demo).")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl hover:opacity-90"
                style={{ backgroundColor: "#f06b6b" }}>
                <FaHistory className="text-xs" /> Download Invoice
              </button>
              <button onClick={() => alert(`Tindakan: ${tindakan}\nDokter: ${dokter}\nDiagnosis: ${diagnosis}\nResep: ${resep}`)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
                Lihat Detail
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
