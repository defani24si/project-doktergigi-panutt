import { useOutletContext } from "react-router-dom";
import { FaCalendarAlt, FaHistory, FaCrown, FaStar, FaHourglass, FaCheckCircle } from "react-icons/fa";

const STATUS_BADGE = {
  Lunas:   "bg-green-50 text-green-600 border border-green-200",
  Pending: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  Selesai: "bg-green-50 text-green-600 border border-green-200",
  Proses:  "bg-blue-50 text-blue-600 border border-blue-200",
  Menunggu:"bg-yellow-50 text-yellow-600 border border-yellow-200",
};

const MC_COLOR = {
  Platinum: "from-purple-500 to-purple-700",
  Gold:     "from-yellow-400 to-amber-600",
  Silver:   "from-gray-400 to-gray-600",
  Bronze:   "from-orange-400 to-orange-600",
  Regular:  "from-blue-400 to-blue-600",
};

export default function MemberDashboard() {
  const { MEMBER, totalPoin, tierMember, transaksiList } = useOutletContext() || {};

  const trxData = transaksiList || [];
  const totalBiaya = trxData.filter(t => t.status === "Lunas").reduce((s, t) => s + Number(t.total || t.biaya || 0), 0);
  const transaksiProses = trxData.filter(t => t.status === "Pending" || t.status === "Menunggu");
  const mc = MC_COLOR[tierMember] || MC_COLOR.Regular;

  // Progress tier
  const tierTarget = tierMember === "Bronze" ? 500 : tierMember === "Silver" ? 1000 : tierMember === "Gold" ? 2000 : 9999;
  const poinStart  = tierMember === "Bronze" ? 0 : tierMember === "Silver" ? 500 : tierMember === "Gold" ? 1000 : 2000;
  const progress   = Math.min(((totalPoin - poinStart) / (tierTarget - poinStart)) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Transaksi",  value: trxData.length,                                icon: <FaCalendarAlt />, color: "bg-blue-50 text-blue-500" },
          { label: "Total Pengeluaran",value: `Rp ${totalBiaya.toLocaleString("id-ID")}`,    icon: <FaHistory />,     color: "bg-green-50 text-green-500" },
          { label: "Poin Loyalty",     value: `${totalPoin} pts`,                            icon: <FaStar />,        color: "bg-yellow-50 text-yellow-500" },
          { label: "Level Member",     value: tierMember,                                    icon: <FaCrown />,       color: "bg-purple-50 text-purple-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
            <p className="text-xs text-gray-500 mb-0.5">{s.label}</p>
            <p className="font-bold text-gray-800 text-sm">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Member Card */}
      <div className={`rounded-3xl bg-gradient-to-br ${mc} p-5 text-white shadow-md`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs mb-1">Member Card</p>
            <p className="font-black text-xl">{MEMBER?.nama || "Member"}</p>
            <p className="text-white/70 text-sm">{MEMBER?.email || ""}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end mb-1">
              <FaCrown /><span className="font-bold">{tierMember}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs">Total Poin</p>
            <p className="font-black text-2xl flex items-center gap-1">
              <FaStar className="text-yellow-200" /> {totalPoin}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs mb-1">Progress ke level berikutnya</p>
            <div className="w-28 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-white/70 text-xs mt-1">{totalPoin}/{tierTarget} poin</p>
          </div>
        </div>
      </div>

      {/* Transaksi Belum Selesai */}
      {transaksiProses.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <FaHourglass className="text-yellow-500" />
            <h3 className="font-bold text-gray-800">Transaksi Belum Selesai</h3>
            <span className="ml-auto text-xs bg-yellow-100 text-yellow-600 font-semibold px-2 py-0.5 rounded-full">{transaksiProses.length} aktif</span>
          </div>
          <div className="space-y-2">
            {transaksiProses.map((t, i) => (
              <div key={t.id || i} className="flex items-center justify-between border-b border-gray-50 pb-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{t.layanan}</p>
                  <p className="text-xs text-gray-400">{t.tanggal}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-sm">Rp {Number(t.total || t.biaya || 0).toLocaleString("id-ID")}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[t.status] || "bg-gray-100 text-gray-500"}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Riwayat Transaksi (4 terbaru) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Riwayat Transaksi</h3>
          <a href="/member/transaksi" className="text-xs font-semibold hover:underline" style={{ color: "#f06b6b" }}>Lihat Semua</a>
        </div>
        {trxData.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm mb-1">Belum ada transaksi.</p>
            <p className="text-gray-300 text-xs">Buat janji temu pertama Anda di menu Booking Janji.</p>
            <a href="/member/booking"
              className="inline-block mt-3 px-4 py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90"
              style={{ backgroundColor: "#f06b6b" }}>
              Booking Sekarang
            </a>
          </div>
        ) : (
          <div className="space-y-2">
            {trxData.slice(0, 4).map((t, i) => {
              const isLunas = t.status === "Lunas";
              return (
                <div key={t.id || i} className="flex items-center justify-between border-b border-gray-50 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isLunas ? "#dcfce7" : "#fef9c3" }}>
                      {isLunas ? <FaCheckCircle className="text-green-500 text-xs" /> : <FaHourglass className="text-yellow-500 text-xs" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-xs">{t.layanan}</p>
                      <p className="text-gray-400 text-xs">{t.tanggal}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-xs">Rp {Number(t.total || t.biaya || 0).toLocaleString("id-ID")}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[t.status] || "bg-gray-100 text-gray-500"}`}>{t.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
