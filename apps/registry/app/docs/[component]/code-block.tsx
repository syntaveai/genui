"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const KEYWORDS =
  /\b(import|from|export|function|const|let|var|return|if|else|interface|type|extends|as|default|async|await)\b/g;

function highlightSyntax(code: string): string {
  return escapeHtml(code)
    .replace(/(\/\/.*)/g, '<span class="text-syntave-500">$1</span>')
    .replace(/(["'`].*?["'`])/g, '<span class="text-syntave-300">$1</span>')
    .replace(KEYWORDS, '<span class="text-syntave-400">$1</span>')
    .replace(
      /\b(string|number|boolean|void|React\.[A-Za-z]+|Record|Element)\b/g,
      '<span class="text-syntave-300">$1</span>',
    )
    .replace(/(\{|\}|\(|\))/g, '<span class="text-syntave-500">$1</span>');
}

/** CodeBlock renders pre-sanitized source code. The `code` prop comes from registry files (developer-authored), never from user input. If reused with user data, must pre-escape HTML first. */
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-syntave-200 bg-syntave-950 group relative overflow-hidden rounded-xl border">
      <button
        onClick={handleCopy}
        className="text-syntave-500 absolute right-4 top-4 rounded-lg p-1.5 opacity-0 transition-all hover:bg-white/10 hover:text-white group-hover:opacity-100"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }} />
      </pre>
    </div>
  );
}
