import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { feedbackService } from "../../services/supabaseService";

export default function MemberFeedback() {
  const { MEMBER } = useOutletContext() || {};
  const [fbRating,  setFbRating]  = useState(5);
  const [fbLayanan, setFbLayanan] = useState("");
  const [fbKomentar,setFbKomentar]= useState("");
  const [fbAlert,   setFbAlert]   = useState("");
  const [fbSaving,  setFbSaving]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFbSaving(true);
    try {
      await feedbackService.create({
        nama: MEMBER?.nama || "Member",
        email: MEMBER?.email || "",
        rating: fbRating, layanan: fbLayanan, komentar: fbKomentar,
      });
      setFbAlert("✅ Terima kasih! Feedback Anda berhasil dikirim.");
      setFbRating(5); setFbLayanan(""); setFbKomentar("");
    } catch {
      setFbAlert("❌ Gagal mengirim feedback. Coba lagi.");
    } finally {
      setFbSaving(false);
    }
    setTimeout(() => setFbAlert(""), 4000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {fbAlert && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium border ${fbAlert.startsWith("✅") ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
          {fbAlert}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-1">Beri Feedback & Rating</h3>
        <p className="text-sm text-gray-400 mb-5">Bagikan pengalaman Anda di Panutt Dental Clinic</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Bintang */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Rating Anda</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} type="button" onClick={() => setFbRating(i)} className="text-3xl transition focus:outline-none">
                  <FaStar className={i <= fbRating ? "text-yellow-400" : "text-gray-200"} />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">{fbRating} / 5</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Layanan yang Dinilai</label>
            <input type="text" value={fbLayanan} onChange={e => setFbLayanan(e.target.value)}
              placeholder="cth: Scaling Gigi, Konsultasi..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b]" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Komentar</label>
            <textarea required rows={4} value={fbKomentar} onChange={e => setFbKomentar(e.target.value)}
              placeholder="Tuliskan pengalaman atau masukan Anda..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f06b6b] resize-none" />
          </div>

          <button type="submit" disabled={fbSaving}
            className="w-full py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#f06b6b" }}>
            {fbSaving ? "Mengirim..." : "Kirim Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
