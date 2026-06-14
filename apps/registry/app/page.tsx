export default function RegistryPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 font-inter">
          Syntave GenUI Registry
        </h1>
        <p className="mt-2 text-gray-500">
          Component registry is available at <code className="font-mono text-gray-800">/r/[name].json</code>
        </p>
      </div>
    </div>
  );
}
