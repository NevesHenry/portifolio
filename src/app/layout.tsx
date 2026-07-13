import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Henrique Reis Neves — Software Developer",
    template: "%s — Henrique Reis Neves",
  },
  description:
    "Software developer focused on event-driven backends, full-stack apps, and cloud-native systems.",
  openGraph: {
    title: "Henrique Reis Neves — Software Developer",
    description:
      "Software developer focused on event-driven backends, full-stack apps, and cloud-native systems.",
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-canvas"
        >
          skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
