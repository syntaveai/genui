import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
        &larr; Back
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: June 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2">
            By using the Syntave GenUI registry, CLI tool, or any associated
            services (&quot;Services&quot;), you agree to these Terms of
            Service. If you do not agree, do not use the Services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            2. Description of Service
          </h2>
          <p className="mt-2">
            Syntave GenUI provides a component registry, CLI tool, and runtime
            packages for building Generative UI applications. The Services are
            provided &quot;as is&quot; without warranty of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            3. Open Source License
          </h2>
          <p className="mt-2">
            The Syntave GenUI source code is distributed under the ISC license.
            You are free to use, modify, and distribute the software in
            accordance with the license terms. The license is available in the
            GitHub repository.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            4. Limitation of Liability
          </h2>
          <p className="mt-2">
            Syntave GenUI shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from your use of
            the Services. The registry and packages are provided free of charge,
            and no liability is assumed for any issues arising from their use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            5. Modifications
          </h2>
          <p className="mt-2">
            We reserve the right to modify these terms at any time. Changes will
            be posted to this page. Continued use of the Services after changes
            constitutes acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}
