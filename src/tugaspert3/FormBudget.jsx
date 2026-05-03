import { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import PesanError from './PesanError';
import BiayaPengeluaran from './BiayaPengeluaran';
import Hasil from './Hasil';

const KATEGORI_OPTIONS = ["Makan", "Transportasi", "Tagihan", "Hiburan", "Penting", "Kesehatan", "Pendidikan", "Lainnya"];

export default function FormBudget() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([]);

  const [inputKategori, setInputKategori] = useState('');
  const [inputNominal, setInputNominal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!inputKategori) {
      setErrorMsg("Harap pilih kategori pengeluaran Anda.");
      return;
    }
    if (!inputNominal || isNaN(inputNominal) || Number(inputNominal) <= 0) {
      setErrorMsg("Nominal pengeluaran harus berupa angka lebih dari 0.");
      return;
    }
    const newExpense = {
      id: Date.now(),
      category: inputKategori,
      amount: Number(inputNominal)
    };
    setExpenses([...expenses, newExpense]);
    setInputKategori('');
    setInputNominal('');
    setErrorMsg('');
  };

  const totalPengeluaran = expenses.reduce((total, item) => total + item.amount, 0);
  const sisaUang = Number(income || 0) - totalPengeluaran;

  return (
    <div className="min-h-screen w-full flex items-start justify-center p-4 py-12 bg-white font-sans">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] overflow-hidden border border-slate-100 text-left transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 p-10 text-center text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight relative z-10 leading-tight drop-shadow-md">Form Mengatur<br />Uang Bulanan</h2>
          <p className="text-blue-100 text-sm mt-3 font-medium relative z-10 tracking-wide">Kendalikan uangmu tiap bulan</p>
        </div>

        <div className="p-8 sm:p-10">

          <div className="mb-8 group">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-indigo-500 inline-block rounded-full"></span> Target
            </h3>
            <InputField
              label="Total Penghasilan (Rp)"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Contoh: 5000000"
            />
          </div>

          <hr className="my-8 border-slate-100" />

          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-rose-500 inline-block rounded-full"></span> Tambah Pengeluaran
            </h3>
            <PesanError message={errorMsg} />
            <form onSubmit={handleAddExpense} className="space-y-4">
              <SelectField
                label="Kategori"
                options={KATEGORI_OPTIONS}
                value={inputKategori}
                onChange={(e) => setInputKategori(e.target.value)}
              />
              <InputField
                label="Nominal (Rp)"
                type="number"
                value={inputNominal}
                onChange={(e) => setInputNominal(e.target.value)}
                placeholder="Contoh: 50000"
              />
              <button
                type="submit"
                className="w-full mt-4 bg-slate-900 hover:bg-black text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-1 shadow-lg shadow-black/10 hover:shadow-xl focus:ring-4 focus:ring-slate-200 active:scale-95 flex justify-center items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Tambah Pengeluaran
              </button>
            </form>
          </div>

          <hr className="my-8 border-slate-100" />

          <div className="mb-8">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-[2px] bg-emerald-500 inline-block rounded-full"></span> Rincian
              </h3>
              <span className="bg-slate-100 text-slate-600 text-[10px] py-1 px-3 rounded-full font-bold uppercase tracking-wider">{expenses.length} Item</span>
            </div>
            <BiayaPengeluaran expenses={expenses} />
          </div>

          <Hasil totalPengeluaran={totalPengeluaran} sisaUang={sisaUang} />
        </div>
      </div>
    </div>
  );
}
