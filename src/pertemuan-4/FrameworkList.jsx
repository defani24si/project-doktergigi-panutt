import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
  {/* Grid Layout: Otomatis menyesuaikan layar */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {frameworkData.map((item) => (
      <div
        key={item.id}
        className="group relative bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
      >
        {/* Dekorasi Glossy di pojok (opsional) */}
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />

        <div className="relative">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {item.name}
            </h2>
            <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-red-50 text-green-600 rounded-md border border-red-100">
              {item.details.developer}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
            {item.description}
          </p>

          {/* Website Link dengan Style Sleek */}
          <a
            href={item.details.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mb-6 group/link"
          >
            Visit Website
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="ArrowRightIcon" />
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Tags Section: Horizontal & Modern */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
