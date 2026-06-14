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
    .replace(/(\/\/.*)/g, '<span class="text-gray-400">$1</span>')
    .replace(/(["'`].*?["'`])/g, '<span class="text-emerald-600">$1</span>')
    .replace(KEYWORDS, '<span class="text-purple-600">$1</span>')
    .replace(
      /\b(string|number|boolean|void|React\.[A-Za-z]+|Record|Element)\b/g,
      '<span class="text-blue-600">$1</span>',
    )
    .replace(/(\{|\}|\(|\))/g, '<span class="text-gray-400">$1</span>');
}

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border border-gray-200 bg-gray-50">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }} />
      </pre>
    </div>
  );
}
