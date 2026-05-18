import DokterCard from "./DokterCard";

const dokters = [
  {
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    title: "drg. Fikri",
    category: "Umum",
    price: "Senin – Jumat",
    description: "Dokter gigi umum dengan pengalaman lebih dari 5 tahun di bidang perawatan gigi dasar.",
  },
  {
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    title: "drg. Anisa",
    category: "Periodonti",
    price: "Selasa – Sabtu",
    description: "Spesialis periodonti yang berpengalaman dalam penanganan penyakit gusi dan jaringan pendukung gigi.",
  },
  {
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    title: "drg. Budi",
    category: "Ortodonti",
    price: "Senin – Rabu",
    description: "Spesialis ortodonti untuk pemasangan behel dan koreksi susunan gigi yang tidak rata.",
  },
];

export default function DokterSection() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tim Dokter Kami</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dokters.map((dokter, i) => (
          <DokterCard
            key={i}
            image={dokter.image}
            title={dokter.title}
            category={dokter.category}
            price={dokter.price}
            description={dokter.description}
          />
        ))}
      </div>
    </section>
  );
}
