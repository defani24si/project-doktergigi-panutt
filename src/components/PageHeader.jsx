export default function PageHeader({ title = "Dashboard", breadcrumb = [], children }) {
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  return (
    <div className="flex items-center justify-between px-4 pt-2 pb-4">
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900">{title}</span>
        <div className="flex items-center space-x-1 mt-1 text-xs">
          <span className="text-gray-500">Dashboard</span>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center space-x-1">
              <span className="text-gray-400">/</span>
              <span className={i === crumbs.length - 1 ? "text-gray-400" : "text-gray-500"}>
                {crumb}
              </span>
            </span>
          ))}
        </div>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}