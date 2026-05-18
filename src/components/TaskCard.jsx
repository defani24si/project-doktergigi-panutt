// TaskCard — sesuai Figma: teks task, priority label merah, kotak coral kanan
export default function TaskCard({ title, duration, priority = "High" }) {
  const priorityColor = {
    High:   "text-[#f06b6b]",
    Medium: "text-yellow-500",
    Low:    "text-green-500",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-gray-800">
          {title}{" "}
          {duration && (
            <span className="text-gray-400 text-xs">{duration}</span>
          )}
        </p>
        <p className={`text-xs font-semibold mt-1 ${priorityColor[priority]}`}>
          Priority: {priority}
        </p>
      </div>

      {/* Kotak coral kanan — sesuai Figma */}
      <div className="w-10 h-10 bg-[#f06b6b] rounded-lg flex-shrink-0 ml-4" />
    </div>
  );
}
