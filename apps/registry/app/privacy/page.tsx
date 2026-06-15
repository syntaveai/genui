import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
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
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-syntave-900 text-3xl font-semibold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-syntave-400 mt-1 text-sm">
            Last updated: June 2026
          </p>
        </div>
      </div>

      <div className="text-syntave-600 mt-10 space-y-8 text-sm leading-relaxed">
        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            1. Information We Collect
          </h2>
          <p className="mt-3">
            Syntave GenUI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;)
            collects minimal information necessary to operate the registry
            service:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-syntave-900">
                Registry API requests:
              </strong>{" "}
              Component names requested from the registry API are logged
              temporarily for analytics and rate-limiting.
            </li>
            <li>
              <strong className="text-syntave-900">CLI usage:</strong> The CLI
              tool checks for updates and fetches component manifests from the
              registry. No personal data is transmitted.
            </li>
            <li>
              <strong className="text-syntave-900">Cookies:</strong> We do not
              use tracking cookies. Essential session cookies may be used if you
              deploy the registry yourself.
            </li>
          </ul>
        </section>

        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            2. How We Use Information
          </h2>
          <p className="mt-3">
            Registry API logs are used solely to improve service reliability and
            monitor for abuse. We do not sell, share, or transfer your data to
            third parties.
          </p>
        </section>

        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            3. Data Retention
          </h2>
          <p className="mt-3">
            API request logs are retained for a maximum of 30 days. After that,
            they are permanently deleted.
          </p>
        </section>

        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            4. Open Source
          </h2>
          <p className="mt-3">
            Syntave GenUI is open-source software. The source code is available
            at{" "}
            <a
              href="https://github.com/syntaveai/genui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-syntave-900 hover:text-syntave-600 font-medium underline underline-offset-2 transition-colors"
            >
              github.com/syntaveai/genui
            </a>
            . You are free to self-host the registry and manage your own data in
            accordance with your own privacy policy.
          </p>
        </section>

        <section className="border-syntave-200 rounded-2xl border bg-white p-6">
          <h2 className="text-syntave-900 text-base font-semibold">
            5. Contact
          </h2>
          <p className="mt-3">
            For privacy-related inquiries, open an issue on our GitHub
            repository.
          </p>
        </section>
      </div>
    </div>
  );
}
