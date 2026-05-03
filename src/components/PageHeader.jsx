export default function PageHeader({ title = "Dashboard", breadcrumb = [], children }) {
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <span className="text-3xl font-semibold text-gray-900">{title}</span>
        <div className="flex items-center space-x-2 mt-2 text-sm font-medium">
          <span className="text-gray-500">Dashboard</span>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              <span className={i === crumbs.length - 1 ? "text-gray-400" : "text-gray-500"}>{crumb}</span>
            </span>
          ))}
        </div>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
