import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Syntave GenUI — open-source Generative UI framework distributed under the ISC license.",
  openGraph: {
    title: "Terms of Service | Syntave GenUI",
    description:
      "Syntave GenUI Terms of Service — ISC-licensed open-source Generative UI framework.",
    url: "https://genuui.syntave.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="text-syntave-500 hover:text-syntave-900 group inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>
      <div className="mt-8 flex items-center gap-3">
        <div className="border-syntave-200 bg-syntave-50 text-syntave-700 flex h-10 w-10 items-center justify-center rounded-xl border">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-syntave-900 text-3xl font-semibold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-syntave-400 mt-1 text-sm">
            Last updated: June 2026
          </p>
        </div>
      </div>

      <div className="text-syntave-600 mt-10 space-y-8 text-sm leading-relaxed">
        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            1. Acceptance of Terms
          </h2>
          <p className="mt-3">
            By using the Syntave GenUI registry, CLI tool, or any associated
            services (&quot;Services&quot;), you agree to these Terms of
            Service. If you do not agree, do not use the Services.
          </p>
        </section>

        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            2. Description of Service
          </h2>
          <p className="mt-3">
            Syntave GenUI provides a component registry, CLI tool, and runtime
            packages for building Generative UI applications. The Services are
            provided &quot;as is&quot; without warranty of any kind.
          </p>
        </section>

        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            3. Open Source License
          </h2>
          <p className="mt-3">
            The Syntave GenUI source code is distributed under the ISC license.
            You are free to use, modify, and distribute the software in
            accordance with the license terms. The license is available in the
            GitHub repository.
          </p>
        </section>

        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            4. Limitation of Liability
          </h2>
          <p className="mt-3">
            Syntave GenUI shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from your use of
            the Services. The registry and packages are provided free of charge,
            and no liability is assumed for any issues arising from their use.
          </p>
        </section>

        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            5. Modifications
          </h2>
          <p className="mt-3">
            We reserve the right to modify these terms at any time. Changes will
            be posted to this page. Continued use of the Services after changes
            constitutes acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}
