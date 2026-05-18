// AddTaskButton — sesuai Figma: dua varian "+ Add task"
// variant="outline" → teks coral dengan plus biasa
// variant="solid"   → icon plus dalam lingkaran coral
export default function AddTaskButton({ onClick, variant = "outline" }) {
  if (variant === "solid") {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#f06b6b] hover:opacity-80 transition"
      >
        <span className="w-6 h-6 bg-[#f06b6b] text-white rounded-full flex items-center justify-center text-base font-bold leading-none">
          +
        </span>
        Add task
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm font-medium text-[#f06b6b] hover:opacity-80 transition"
    >
      <span className="text-lg leading-none">+</span>
      Add task
    </button>
  );
}
