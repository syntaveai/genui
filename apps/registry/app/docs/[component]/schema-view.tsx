export function SchemaView({ text }: { text: string }) {
  return (
    <pre className="border-syntave-200 bg-syntave-950 text-syntave-300 overflow-x-auto rounded-xl border p-5 font-mono text-sm leading-relaxed">
      <code>{text}</code>
    </pre>
  );
}
