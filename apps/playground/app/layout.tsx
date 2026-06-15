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

const baseUrl = "https://genuui.syntave.com/playground";

export const metadata: Metadata = {
  metadataBase: new URL("https://syntave-playground.vercel.app"),
  title: {
    default: "Syntave GenUI Playground — Interactive Component Testing",
    template: "%s | Syntave GenUI Playground",
  },
  description:
    "Interactive testing environment for Syntave GenUI components. Preview and experiment with 57 accessible, type-safe React components for Generative UI.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Syntave GenUI Playground",
    title: "Syntave GenUI Playground — Interactive Component Testing",
    description:
      "Interactive testing environment for Syntave GenUI components. Preview 57 React components for Generative UI.",
    images: [
      {
        url: "https://syntave.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Syntave GenUI Playground",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@syntave",
    creator: "@syntave",
    title: "Syntave GenUI Playground",
    description:
      "Interactive testing environment for Syntave GenUI components.",
    images: ["https://syntave.com/og-image.png"],
  },
  icons: {
    icon: "https://syntave.com/favicon.ico",
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  );
}
