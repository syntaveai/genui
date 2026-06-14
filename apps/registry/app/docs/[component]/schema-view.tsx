export function SchemaView({ text }: { text: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm leading-relaxed text-gray-700">
      <code>{text}</code>
    </pre>
  );
}
