export default function Hasil({ totalPengeluaran, sisaUang }) {
  const isMinus = sisaUang < 0;

  return (
    <div className="mt-8 p-1 rounded-3xl bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 shadow-xl shadow-indigo-500/20">
      <div className="bg-white/95 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 h-full w-full">
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex justify-between items-center group transition-colors hover:bg-slate-100/80">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shadow-inner">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <span className="text-slate-600 font-bold text-[13px] tracking-wide">TOTAL PENGELUARAN</span>
             </div>
             <span className="text-slate-900 font-black text-xl tracking-tight">Rp {totalPengeluaran.toLocaleString('id-ID')}</span>
          </div>
          
          <div className={`p-6 rounded-2xl flex justify-between items-center bg-gradient-to-br ${isMinus ? 'from-rose-50 to-rose-100/50 border border-rose-200' : 'from-emerald-50 to-emerald-100/50 border border-emerald-200'} shadow-sm`}>
            <div className="flex flex-col gap-1">
              <span className={`text-[10px] uppercase tracking-[0.15em] font-extrabold ${isMinus ? 'text-rose-600' : 'text-emerald-600'}`}>
                {isMinus ? 'Defisit' : 'Sisa Uang (Surplus)'}
              </span>
              <span className={`font-black text-3xl sm:text-4xl tracking-tighter ${isMinus ? 'text-rose-700' : 'text-emerald-700'} drop-shadow-sm`}>
                Rp {sisaUang.toLocaleString('id-ID')}
              </span>
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${isMinus ? 'bg-rose-500 text-white shadow-rose-500/30' : 'bg-emerald-500 text-white shadow-emerald-500/30'} transform -rotate-6`}>
               {isMinus ? (
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
               ) : (
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
