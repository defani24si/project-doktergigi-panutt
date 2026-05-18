import { FaTooth } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="bg-[#f06b6b] text-white py-16 px-8 text-center rounded-2xl">
      <div className="flex justify-center mb-4">
        <div className="bg-white bg-opacity-20 rounded-full p-4">
          <FaTooth className="text-4xl text-white" />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-3">Panutt Dental Clinic</h1>

      <p className="text-white text-opacity-90 text-lg max-w-xl mx-auto mb-6">
        Layanan kesehatan gigi profesional untuk senyum yang lebih sehat dan percaya diri.
      </p>

      <div className="flex justify-center gap-3 flex-wrap">
        <button className="bg-white text-[#f06b6b] font-semibold px-6 py-2 rounded-lg hover:bg-gray-50 transition">
          Buat Janji Temu
        </button>
        <button className="border-2 border-white text-white font-semibold px-6 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
          Lihat Layanan
        </button>
      </div>
    </section>
  );
}
