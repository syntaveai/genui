import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const baseUrl = "https://genuui.syntave.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Syntave GenUI - AI-Native Component Registry for Generative UI",
    template: "%s | Syntave GenUI",
  },
  description:
    "Open-source component registry and runtime for building AI-driven user interfaces. Type-safe LLM-driven UI components with Zod validation. 57 accessible, monochrome React components.",
  keywords: [
    "Generative UI",
    "AI components",
    "React components",
    "LLM UI",
    "Syntave",
    "AI-native UI",
    "type-safe UI",
    "Zod schemas",
    "MCP tools",
    "AI-driven interfaces",
    "UI registry",
  ],
  authors: [{ name: "Syntave", url: "https://syntave.com" }],
  creator: "Syntave",
  publisher: "Syntave",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Syntave GenUI",
    title: "Syntave GenUI - AI-Native Component Registry for Generative UI",
    description:
      "Open-source component registry and runtime for building AI-driven user interfaces. Type-safe LLM-driven UI components with Zod validation.",
    images: [
      {
        url: "https://syntave.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Syntave GenUI — AI-native component registry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@syntave",
    creator: "@syntave",
    title: "Syntave GenUI - AI-Native Component Registry",
    description:
      "Open-source component registry and runtime for building AI-driven user interfaces.",
    images: ["https://syntave.com/og-image.png"],
  },
  icons: {
    icon: "https://syntave.com/favicon.ico",
    shortcut: "https://syntave.com/favicon-16x16.png",
    apple: "https://syntave.com/apple-touch-icon.png",
  },
  alternates: {
    canonical: baseUrl,
  },
  other: {
    "geo.region": "US",
    "geo.placename": "Global",
    "geo.position": "0; 0",
    ICBM: "0, 0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Syntave GenUI",
    url: baseUrl,
    description:
      "Open-source component registry and runtime for building AI-driven user interfaces.",
    publisher: {
      "@type": "Organization",
      name: "Syntave",
      url: "https://syntave.com",
    },
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-inter">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
