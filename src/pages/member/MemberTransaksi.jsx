import { useOutletContext } from "react-router-dom";
import { FaCheckCircle, FaHourglass, FaHistory } from "react-icons/fa";

const STATUS_BADGE = {
  Lunas:   "bg-green-50 text-green-600",
  Pending: "bg-yellow-50 text-yellow-600",
};

export default function MemberTransaksi() {
  const { transaksiList = [] } = useOutletContext() || {};
  const totalLunas = transaksiList.filter(t => t.status === "Lunas").reduce((s, t) => s + Number(t.total || t.biaya || 0), 0);

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Stat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: transaksiList.length },
          { label: "Lunas", value: transaksiList.filter(t => t.status === "Lunas").length },
          { label: "Pending", value: transaksiList.filter(t => t.status === "Pending").length },
          { label: "Total Biaya", value: `Rp ${totalLunas.toLocaleString("id-ID")}` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="font-bold text-gray-800 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      {transaksiList.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 shadow-sm">Belum ada transaksi.</div>
      ) : transaksiList.map((t, i) => {
        const isLunas = t.status === "Lunas";
        return (
          <div key={t.id || i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: isLunas ? "#dcfce7" : "#fef9c3" }}>
                {isLunas ? <FaCheckCircle className="text-green-500" /> : <FaHourglass className="text-yellow-500 text-sm" />}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{t.layanan}</p>
                <p className="text-xs text-gray-500">{t.invoice || t.trx_id} • {t.tanggal}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Metode: {t.metode_pembayaran || t.metode || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-black text-gray-800">Rp {Number(t.total || t.biaya || 0).toLocaleString("id-ID")}</p>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block mt-1 ${STATUS_BADGE[t.status] || "bg-gray-100 text-gray-500"}`}>
                  {t.status}
                </span>
              </div>
              <button onClick={() => alert(`Invoice ${t.invoice || t.trx_id} akan diunduh (fitur demo).`)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: "#f06b6b" }}>
                <FaHistory className="text-sm" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
