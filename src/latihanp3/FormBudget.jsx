import { useMemo, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Hasil from "./Hasil";
import InputField from "./InputField.jsx";
import SelectField from "./SelectField";

const OpsiKategori = [
  { label: "Pilih kategori", value: "" },
  { label: "Makanan", value: "Makanan" },
  { label: "Transport", value: "Transport" },
  { label: "Hiburan", value: "Hiburan" },
  { label: "Tagihan", value: "Tagihan" },
];

const initialCategoryTotals = {
  Makanan: 0,
  Transport: 0,
  Hiburan: 0,
  Tagihan: 0,
};

export default function FormBudget() {
  const [pemasukan, setPemasukan] = useState(0);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [pengeluaran, setPengeluaran] = useState([]);
  const [error, setError] = useState("");

  const totalPengeluaran = useMemo(
    () => pengeluaran.reduce((sum, item) => sum + item.amount,0),
    [pengeluaran]
  );

  const balance = Math.max(pemasukan - totalPengeluaran, 0);

  const categoryTotals = useMemo(() => {
    return pengeluaran.reduce((totals, expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      return totals;
    }, { ...initialCategoryTotals });
  }, [pengeluaran]);

  function handleAddExpense() {
    const parsedAmount = Number(amount);

    if (!pemasukan || pemasukan <= 0) {
      return setError("Penghasilan bulanan harus diisi dan lebih dari 0.");
    }

    if (!category) {
      return setError("Pilih kategori pengeluaran.");
    }

    if (!parsedAmount || parsedAmount <= 0) {
      return setError("Nominal pengeluaran harus lebih dari 0.");
    }

    setPengeluaran((current) => [
      ...current,
      { id: Date.now(), category, amount: parsedAmount },
    ]);
    setCategory("");
    setAmount("");
    setError("");
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 rounded-3xl bg-sky-600 p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Form Pengeluaran Bulanan</h1>
          <p className="mt-2 text-sky-100">Atur penghasilan dan pengeluaranmu tiap bulan dengan cepat.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-5">Form Input</h2>
            <ErrorMessage message={error} />

            <InputField
              label="Penghasilan Bulanan"
              type="number"
              value={pemasukan}
              onChange={(event) => setPemasukan(Number(event.target.value))}
              placeholder="Masukkan penghasilan kamu"
            />
            <SelectField
              label="Kategori"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              options={OpsiKategori}
            />
            <InputField
              label="Nominal Pengeluaran"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Masukkan nominal pengeluaran"
            />
            <button
              type="button"
              onClick={handleAddExpense}
              className="mt-2 w-full rounded-full bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700"
            >
              Tambah
            </button>
          </section>

          <section className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-5">Hasil</h2>
            <Hasil pemasukan={pemasukan} totalPengeluaran={totalPengeluaran} balance={balance} />
          </section>
        </div>

        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-5">Pengeluaran</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Makanan</h3>
              <p className="text-2xl font-bold">Rp {categoryTotals.Makanan.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Transport</h3>
              <p className="text-2xl font-bold">Rp {categoryTotals.Transport.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Hiburan</h3>
              <p className="text-2xl font-bold">Rp {categoryTotals.Hiburan.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Tagihan</h3>
              <p className="text-2xl font-bold">Rp {categoryTotals.Tagihan.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-7 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-3">Kategori</th>
                  <th className="py-3">Nominal</th>
                </tr>
              </thead>
              <tbody>
                {pengeluaran.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="py-5 text-center text-slate-500">
                      Belum ada pengeluaran.
                    </td>
                  </tr>
                ) : (
                  pengeluaran.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-3">{item.category}</td>
                      <td className="py-3">Rp {item.amount.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}