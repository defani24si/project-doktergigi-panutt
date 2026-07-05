import { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaCommentDots, FaSmile } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import { feedbackService } from "../../services/supabaseService";

// Render bintang rating
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} className="text-gray-300" />
      )}
    </div>
  );
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const data = await feedbackService.getAll();
      setFeedbacks(data);
    } catch (err) {
      console.error("Gagal load feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalFeedback = feedbacks.length;
  const avgRating = totalFeedback
    ? (feedbacks.reduce((s, f) => s + f.rating, 0) / totalFeedback).toFixed(1)
    : "0.0";
  const totalPuas = feedbacks.filter((f) => f.rating >= 4).length;

  return (
    <div className="flex flex-col w-full pb-10">
      <PageHeader title="Feedback & Rating" breadcrumb={["Feedback"]} />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl">
              <FaCommentDots />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Feedback</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalFeedback}</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center text-xl">
              <FaStar />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Rata-rata Rating</p>
              <h3 className="text-2xl font-bold text-gray-800">{avgRating} / 5</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-xl">
              <FaSmile />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Pasien Puas (≥4★)</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalPuas}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* List Feedback */}
      <Card>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Semua Feedback Pasien</h3>

        {loading ? (
          <p className="text-center text-gray-400 py-8">Memuat data...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-400 py-8">Belum ada feedback.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((f) => (
              <div key={f.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3">
                  <Avatar name={f.nama} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <p className="font-semibold text-gray-800">{f.nama}</p>
                        <p className="text-xs text-gray-400">{f.layanan || "Umum"}</p>
                      </div>
                      <div className="text-right">
                        <Stars rating={f.rating} />
                        <p className="text-xs text-gray-400 mt-1">
                          {f.created_at ? new Date(f.created_at).toLocaleDateString("id-ID") : ""}
                        </p>
                      </div>
                    </div>
                    {f.komentar && (
                      <p className="text-sm text-gray-600 mt-2 bg-gray-50 rounded-lg px-3 py-2">
                        "{f.komentar}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
