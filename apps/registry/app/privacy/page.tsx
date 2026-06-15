import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
        &larr; Back
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: June 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            1. Information We Collect
          </h2>
          <p className="mt-2">
            Syntave GenUI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;)
            collects minimal information necessary to operate the registry
            service:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Registry API requests:</strong> Component names requested
              from the registry API are logged temporarily for analytics and
              rate-limiting.
            </li>
            <li>
              <strong>CLI usage:</strong> The CLI tool checks for updates and
              fetches component manifests from the registry. No personal data is
              transmitted.
            </li>
            <li>
              <strong>Cookies:</strong> We do not use tracking cookies.
              Essential session cookies may be used if you deploy the registry
              yourself.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            2. How We Use Information
          </h2>
          <p className="mt-2">
            Registry API logs are used solely to improve service reliability and
            monitor for abuse. We do not sell, share, or transfer your data to
            third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            3. Data Retention
          </h2>
          <p className="mt-2">
            API request logs are retained for a maximum of 30 days. After that,
            they are permanently deleted.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            4. Open Source
          </h2>
          <p className="mt-2">
            Syntave GenUI is open-source software. The source code is available
            at{" "}
            <a
              href="https://github.com/syntaveai/genui"
              className="text-gray-900 underline underline-offset-2"
            >
              github.com/syntaveai/genui
            </a>
            . You are free to self-host the registry and manage your own data in
            accordance with your own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Contact</h2>
          <p className="mt-2">
            For privacy-related inquiries, open an issue on our GitHub
            repository.
          </p>
        </section>
      </div>
    </div>
  );
}
