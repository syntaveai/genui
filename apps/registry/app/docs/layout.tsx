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
        <div className="mx-auto w-full max-w-3xl flex-1 px-8 py-10 lg:px-12">
          {children}
        </div>
        <footer className="border-syntave-200 bg-syntave-50/50 border-t py-8">
          <div className="text-syntave-400 mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-8 text-xs sm:flex-row lg:px-12">
            <p>Syntave GenUI</p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-syntave-600 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-syntave-600 transition-colors"
              >
                Terms
              </Link>
              <a
                href="https://github.com/syntaveai/genui"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-syntave-600 transition-colors"
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
