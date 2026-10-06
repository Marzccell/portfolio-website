import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Marcell Matthew Loemanto — Informatics Student & Builder",
  description:
    "The portfolio of Marcell Matthew Loemanto, an Informatics student at Petra Christian University. Web applications, Unity games, and a growing collection of things built while learning.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Marcell Matthew Loemanto — Selected Work",
    description: "Curious mind. Hands-on builder. Still learning.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Marcell Matthew Loemanto portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcell Matthew Loemanto",
    description:
      "Informatics student at PCU. Turning what I learn into things you can use.",
    images: ["/og.png"],
  },
};
export const viewport: Viewport = {
  themeColor: "#10182b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
