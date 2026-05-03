export default function Hasil({ pemasukan, totalPengeluaran, balance }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold mb-3">Hasil Bulanan</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-slate-600">
          <span>Penghasilan</span>
          <span>Rp {pemasukan.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Total Pengeluaran</span>
          <span>Rp {totalPengeluaran.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-900 font-semibold">
          <span>Sisa Uang</span>
          <span>Rp {balance.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}