export default function BiayaPengeluaran({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="border-2 border-dashed border-slate-200 rounded-3xl py-12 flex flex-col items-center justify-center bg-slate-50/50 gap-3">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
        </div>
        <p className="text-slate-400 text-sm font-semibold">Belum ada pengeluaran dicatat.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="group relative overflow-hidden flex justify-between items-center bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-lg shadow-inner">
               {expense.category.charAt(0)}
            </div>
            <span className="font-bold text-slate-700 tracking-wide text-[15px]">{expense.category}</span>
          </div>
          <span className="text-slate-900 font-extrabold bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-xl tracking-tight">Rp {Number(expense.amount).toLocaleString('id-ID')}</span>
        </div>
      ))}
    </div>
  );
}
