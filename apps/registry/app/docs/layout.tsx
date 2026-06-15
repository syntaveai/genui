import Link from "next/link";
import { DocsNav } from "../../components/docs-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <DocsNav />
      <main className="flex flex-1 flex-col overflow-auto">
        <div className="mx-auto w-full max-w-3xl flex-1 px-12 py-10">
          {children}
        </div>
        <footer className="border-t border-gray-200 py-6">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-12 text-xs text-gray-400">
            <p>Syntave GenUI</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-600">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gray-600">
                Terms
              </Link>
              <a
                href="https://github.com/syntaveai/genui"
                className="hover:text-gray-600"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
