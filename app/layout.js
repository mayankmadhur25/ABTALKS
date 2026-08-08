import { Suspense } from "react";
import "./globals.css";
import DeskRail from "@/components/DeskRail";

export const metadata = {
  title: "ABTalks · 60 nights, 60 things you built",
  description:
    "A 60 day build challenge for Indian college students. Pick a track, ship a commit and a post every night, and leave with a public build record.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f4f1",
};

/*
 * Fonts load with a stylesheet link rather than next/font on purpose.
 * next/font fetches from Google at BUILD time, so a network blip during a
 * Vercel build fails the whole deploy. The live demo URL has to work, so the
 * build must never depend on an external fetch. This loads at runtime instead.
 *
 * Desktop is a secondary consideration, handled as one. The mobile design is
 * untouched below 1024px. Above it, the column becomes a bordered sheet with a
 * navigation rail beside it, which is what a desktop application looks like
 * anyway. Nothing is stretched.
 *
 * No overflow-hidden on the sheet. It would clip the sticky header and the
 * sticky submit bar inside every screen.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&family=Unbounded:wght@600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased lg:bg-[#dedcd6] lg:py-12">
        <a className="skip" href="#content">
          Skip to content
        </a>

        <div className="lg:mx-auto lg:flex lg:w-fit lg:items-start lg:gap-10">
          <Suspense fallback={null}>
            <DeskRail />
          </Suspense>

          <div className="mx-auto w-full max-w-[420px] bg-paper lg:mx-0 lg:border-2 lg:border-ink lg:shadow-[8px_8px_0_var(--ink)]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
