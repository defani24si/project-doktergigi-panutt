import { useState, useMemo } from "react";
import { FaGift, FaStar, FaCrown, FaSearch, FaCheck } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Alert from "../../components/Alert";
import { useClinic } from "../../context/useClinic";

const REWARDS = [
  { id: 1, nama: "Diskon 10% Scaling", poin: 100, keterangan: "Berlaku untuk layanan Scaling Gigi" },
  { id: 2, nama: "Gratis Konsultasi", poin: 150, keterangan: "1x konsultasi gratis dengan dokter umum" },
  { id: 3, nama: "Diskon 20% Tambal", poin: 200, keterangan: "Berlaku untuk layanan Tambal Komposit" },
  { id: 4, nama: "Gratis Scaling", poin: 350, keterangan: "1x scaling gigi gratis" },
  { id: 5, nama: "Voucher Rp 100rb", poin: 500, keterangan: "Voucher diskon Rp 100.000 untuk semua layanan" },
];

const MEMBERSHIP_POIN = { Platinum: 500, Gold: 300, Silver: 150, Regular: 50 };

export default function KlaimReward() {
  const { patients } = useClinic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPasien, setSelectedPasien] = useState(null);
  const [successAlert, setSuccessAlert] = useState("");
  const [claimHistory, setClaimHistory] = useState([]);

  const filteredPasien = useMemo(() => {
    if (!searchTerm) return [];
    return patients.filter((p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [patients, searchTerm]);

  const getPoin = (pasien) => MEMBERSHIP_POIN[pasien.levelMembership] || 0;

  const handleKlaim = (reward) => {
    if (!selectedPasien) return;
    const poin = getPoin(selectedPasien);
    if (poin < reward.poin) {
      setSuccessAlert(`Poin tidak cukup. Dibutuhkan ${reward.poin} poin, Anda hanya punya ${poin} poin.`);
      setTimeout(() => setSuccessAlert(""), 4000);
      return;
    }
    const newClaim = {
      id: claimHistory.length + 1,
      pasienNama: selectedPasien.nama,
      pasienId: selectedPasien.id,
      reward: reward.nama,
      poin: reward.poin,
      tanggal: new Date().toISOString().split("T")[0],
    };
    setClaimHistory([newClaim, ...claimHistory]);
    setSuccessAlert(`Reward "${reward.nama}" berhasil diklaim oleh ${selectedPasien.nama}!`);
    setSearchTerm("");
    setSelectedPasien(null);
    setTimeout(() => setSuccessAlert(""), 5000);
  };

  const getMembershipColor = (level) => {
    const colors = { Platinum: "text-purple-600 bg-purple-50", Gold: "text-yellow-600 bg-yellow-50", Silver: "text-gray-600 bg-gray-100", Regular: "text-blue-600 bg-blue-50" };
    return colors[level] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Klaim Reward" breadcrumb={["Loyalitas Pelanggan"]} />

      {successAlert && (
        <div className="mb-4">
          <Alert type="success" onClose={() => setSuccessAlert("")}>{successAlert}</Alert>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center text-xl"><FaCrown /></div>
            <div>
              <p className="text-gray-500 text-sm">Total Reward</p>
              <h3 className="text-2xl font-bold text-gray-800">{REWARDS.length}</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center text-xl"><FaStar /></div>
            <div>
              <p className="text-gray-500 text-sm">Total Klaim</p>
              <h3 className="text-2xl font-bold text-gray-800">{claimHistory.length}</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-xl"><FaGift /></div>
            <div>
              <p className="text-gray-500 text-sm">Member Aktif</p>
              <h3 className="text-2xl font-bold text-gray-800">{patients.filter((p) => p.status === "Aktif").length}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kiri: Cari Pasien + Reward */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold text-gray-800 mb-3">Cari Pasien</h3>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setSelectedPasien(null); }}
                placeholder="Ketik nama atau ID pasien..."
                className="w-full border border-gray-300 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]"
              />
            </div>

            {/* Dropdown hasil pencarian */}
            {filteredPasien.length > 0 && !selectedPasien && (
              <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden">
                {filteredPasien.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => { setSelectedPasien(p); setSearchTerm(p.nama); }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{p.nama}</p>
                      <p className="text-xs text-gray-400">{p.id}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getMembershipColor(p.levelMembership)}`}>
                      {p.levelMembership}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Info pasien terpilih */}
            {selectedPasien && (
              <div className="mt-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{selectedPasien.nama}</p>
                    <p className="text-xs text-gray-500">{selectedPasien.id} · {selectedPasien.noHp}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${getMembershipColor(selectedPasien.levelMembership)}`}>
                    {selectedPasien.levelMembership}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold text-xl text-gray-800">{getPoin(selectedPasien)}</span>
                  <span className="text-gray-500 text-sm">poin tersedia</span>
                </div>
              </div>
            )}
          </Card>

          {/* Daftar Reward */}
          <Card>
            <h3 className="font-semibold text-gray-800 mb-3">Pilih Reward</h3>
            <div className="space-y-3">
              {REWARDS.map((reward) => {
                const cukup = selectedPasien && getPoin(selectedPasien) >= reward.poin;
                return (
                  <div key={reward.id} className={`flex items-center justify-between p-3 rounded-xl border transition ${cukup ? "border-green-200 bg-green-50" : "border-gray-100 bg-gray-50"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${cukup ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"}`}>
                        <FaGift />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{reward.nama}</p>
                        <p className="text-xs text-gray-400">{reward.keterangan}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">{reward.poin} poin</span>
                      <button
                        onClick={() => handleKlaim(reward)}
                        disabled={!selectedPasien}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition flex items-center gap-1 ${
                          cukup
                            ? "bg-[#f06b6b] text-white hover:bg-[#c73030]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <FaCheck /> Klaim
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Kanan: Riwayat Klaim */}
        <Card>
          <h3 className="font-semibold text-gray-800 mb-3">Riwayat Klaim</h3>
          {claimHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <FaGift className="mx-auto text-4xl mb-3 opacity-30" />
              <p className="text-sm">Belum ada klaim reward</p>
            </div>
          ) : (
            <div className="space-y-3">
              {claimHistory.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
                      <FaCheck />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{c.pasienNama}</p>
                      <p className="text-xs text-gray-400">{c.reward}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-yellow-600">-{c.poin} poin</span>
                    <p className="text-xs text-gray-400">{c.tanggal}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
