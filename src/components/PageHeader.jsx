export default function PageHeader({ title = "Dashboard", breadcrumb = [], children }) {
  // Title & breadcrumb are now shown in the top Header navbar.
  // PageHeader only renders action buttons (children) if provided.
  if (!children) return null;

  return (
    <div className="flex items-center justify-end px-4 pt-2 pb-4">
      <div>{children}</div>
    </div>
  );
}