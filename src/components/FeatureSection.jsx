import { FaTooth, FaUserMd, FaCalendarCheck, FaShieldAlt } from "react-icons/fa";
import Card from "./Card";

const features = [
  {
    icon: <FaTooth className="text-3xl text-[#f06b6b]" />,
    title: "Perawatan Lengkap",
    desc: "Dari scaling, tambal, hingga bedah mulut — semua tersedia di satu tempat.",
  },
  {
    icon: <FaUserMd className="text-3xl text-[#f06b6b]" />,
    title: "Dokter Berpengalaman",
    desc: "Tim dokter gigi spesialis kami siap memberikan penanganan terbaik.",
  },
  {
    icon: <FaCalendarCheck className="text-3xl text-[#f06b6b]" />,
    title: "Janji Temu Mudah",
    desc: "Buat janji temu kapan saja dan dapatkan konfirmasi langsung.",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-[#f06b6b]" />,
    title: "Terpercaya & Aman",
    desc: "Peralatan steril dan prosedur sesuai standar kesehatan nasional.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Mengapa Memilih Kami?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <Card key={i}>
            <div className="text-center">
              <div className="flex justify-center mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
