export default function PesanError({ message }) {
  if (!message) return null;
  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-rose-50 text-rose-600 px-5 py-4 rounded-xl mb-6 border-l-4 border-rose-500 shadow-sm flex items-center gap-3">
      <div className="p-1.5 bg-rose-100/50 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <span className="font-semibold text-sm tracking-wide">{message}</span>
    </div>
  );
}
