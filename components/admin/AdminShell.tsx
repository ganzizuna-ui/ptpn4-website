import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-zinc-200 px-6 sm:px-10 py-6">
          <h1 className="text-xl font-bold text-zinc-900">{title}</h1>
          {description && (
            <p className="text-sm text-zinc-500 mt-1">{description}</p>
          )}
        </header>
        <main className="p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
