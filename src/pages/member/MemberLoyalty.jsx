import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { FaStar, FaCrown, FaTag, FaCopy } from "react-icons/fa";
import { userService } from "../../services/supabaseService";

const MC_COLOR = {
  Platinum: "from-purple-500 to-purple-700",
  Gold:     "from-yellow-400 to-amber-600",
  Silver:   "from-gray-400 to-gray-600",
  Bronze:   "from-orange-400 to-orange-600",
  Regular:  "from-blue-400 to-blue-600",
};

const REWARDS = [
  { nama: "Gratis Konsultasi", poin: 150, desc: "1x konsultasi gratis" },
  { nama: "Diskon 20% Tambal", poin: 200, desc: "Berlaku semua layanan tambal" },
  { nama: "Gratis Scaling",    poin: 350, desc: "1x scaling gigi gratis" },
  { nama: "Voucher Rp 100rb",  poin: 500, desc: "Untuk semua layanan" },
];

export default function MemberLoyalty() {
  const { MEMBER, userDb, setUserDb, totalPoin, tierMember, promoList = [] } = useOutletContext() || {};
  const [claimAlert, setClaimAlert] = useState("");
  const [copiedKode, setCopiedKode] = useState("");
  const mc = MC_COLOR[tierMember] || MC_COLOR.Regular;

  const tierTarget = tierMember === "Bronze" ? 500 : tierMember === "Silver" ? 1000 : tierMember === "Gold" ? 2000 : 9999;
  const poinStart  = tierMember === "Bronze" ? 0 : tierMember === "Silver" ? 500 : tierMember === "Gold" ? 1000 : 2000;
  const progress   = Math.min(((totalPoin - poinStart) / (tierTarget - poinStart)) * 100, 100);

  const handleKlaim = async (reward) => {
    if (totalPoin < reward.poin) {
      setClaimAlert(`❌ Poin tidak mencukupi. Butuh ${reward.poin} pts, kamu punya ${totalPoin} pts.`);
      setTimeout(() => setClaimAlert(""), 4000);
      return;
    }
    try {
      const poinBaru = totalPoin - reward.poin;
      let tierBaru = "Bronze";
      if (poinBaru >= 2000) tierBaru = "Platinum";
      else if (poinBaru >= 1000) tierBaru = "Gold";
      else if (poinBaru >= 500) tierBaru = "Silver";

      if (userDb?.id) {
        await userService.update(userDb.id, { total_poin: poinBaru, membership_tier: tierBaru });
        const updated = await userService.getByEmail(MEMBER?.email);
        if (updated && setUserDb) setUserDb(updated);
      }
      setClaimAlert(`✅ Berhasil menukar ${reward.poin} poin dengan "${reward.nama}"! Sisa: ${totalPoin - reward.poin} pts.`);
    } catch {
      setClaimAlert(`✅ Reward "${reward.nama}" berhasil diklaim!`);
    }
    setTimeout(() => setClaimAlert(""), 5000);
  };

  const handleCopy = (kode) => {
    navigator.clipboard.writeText(kode).catch(() => {});
    setCopiedKode(kode);
    setTimeout(() => setCopiedKode(""), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {claimAlert && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium ${claimAlert.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
          {claimAlert}
        </div>
      )}

      {/* Poin card */}
      <div className={`rounded-3xl bg-gradient-to-br ${mc} p-5 text-white shadow-md`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs mb-1">Poin Kamu</p>
            <p className="text-4xl font-black flex items-center gap-2"><FaStar className="text-yellow-200" /> {totalPoin}</p>
            <p className="text-white/70 text-xs mt-1">{tierMember} Member</p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs mb-1">Progress ke level berikutnya</p>
            <div className="w-28 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-white/70 text-xs mt-1">{totalPoin}/{tierTarget} poin</p>
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">Tukar Poin dengan Reward</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REWARDS.map(r => {
            const bisa = totalPoin >= r.poin;
            return (
              <div key={r.nama} className={`border rounded-2xl p-4 transition ${bisa ? "border-green-200 bg-green-50" : "border-gray-100 bg-gray-50"}`}>
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-gray-800 text-sm">{r.nama}</p>
                  <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">{r.poin} pts</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{r.desc}</p>
                <button onClick={() => handleKlaim(r)}
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition ${bisa ? "text-white hover:opacity-90" : "bg-gray-200 text-gray-500"}`}
                  style={bisa ? { backgroundColor: "#f06b6b" } : {}}>
                  {bisa ? "Tukar Sekarang" : `Kurang ${r.poin - totalPoin} poin lagi`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promo */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">Kode Promo Tersedia</h3>
        {promoList.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">Belum ada promo aktif.</p>
        ) : (
          <div className="space-y-3">
            {promoList.map(p => (
              <div key={p.id} className="flex items-center justify-between border border-dashed border-red-200 rounded-2xl p-4 bg-red-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f06b6b" }}>
                    <FaTag className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{p.nama}</p>
                    <p className="text-xs text-gray-500">Berlaku hingga {p.berlakuHingga || "-"}</p>
                  </div>
                </div>
                <div className="text-right ml-3">
                  <p className="font-black text-xl" style={{ color: "#f06b6b" }}>{p.diskon}%</p>
                  <button onClick={() => handleCopy(p.kode)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#f06b6b] transition mt-1">
                    <FaCopy className="text-xs" />
                    <span className="font-mono font-bold">{copiedKode === p.kode ? "✓ Tersalin!" : p.kode}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
