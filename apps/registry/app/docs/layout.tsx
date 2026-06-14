import { DocsNav } from "../../components/docs-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <DocsNav />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl px-12 py-10">{children}</div>
      </main>
    </div>
  );
}
