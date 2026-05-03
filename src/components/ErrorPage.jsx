export default function ErrorPage({
  code = 404,
  description = "Halaman tidak ditemukan.",
  image = null,
}) {
  const defaults = {
    400: { label: "Bad Request", color: "text-yellow-500" },
    401: { label: "Unauthorized", color: "text-orange-500" },
    403: { label: "Forbidden", color: "text-red-500" },
    404: { label: "Not Found", color: "text-hijau" },
  };

  const { label, color } = defaults[code] || { label: "Error", color: "text-gray-500" };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      {image ? (
        <img src={image} alt={`Error ${code}`} className="w-64 mb-6 opacity-80" />
      ) : (
        <div className="text-[120px] font-extrabold leading-none mb-4 text-gray-100 select-none">
          {code}
        </div>
      )}
      <h1 className={`text-6xl font-extrabold ${color} -mt-8`}>{code}</h1>
      <p className="text-xl font-semibold text-gray-700 mt-3">{label}</p>
      <p className="text-gray-400 mt-2 max-w-md">{description}</p>
    </div>
  );
}
