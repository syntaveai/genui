import Link from "next/link";

export default function RegistryPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="font-inter text-3xl font-semibold tracking-tight text-gray-900">
          Syntave GenUI Registry
        </h1>
        <p className="mt-2 text-gray-500">
          Component registry is available at{" "}
          <code className="font-mono text-gray-800">/r/[name].json</code>
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            View Documentation
          </Link>
          <a
            href="/r/metric-card.json"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Browse Registry
          </a>
        </div>
      </div>
    </div>
  );
}
