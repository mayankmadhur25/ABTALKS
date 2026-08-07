import "./globals.css";

export const metadata = {
  title: "ABTalks · 60 nights, 60 things you built",
  description:
    "A 60 day build challenge for Indian college students. Pick a track, ship a commit and a post every night, and leave with a public build record.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e1119",
};

/*
 * Fonts load via a stylesheet link rather than next/font on purpose.
 * next/font fetches from Google at BUILD time, so a network blip during a
 * Vercel build fails the whole deploy. The live demo URL has to work, so the
 * build must never depend on an external fetch. This loads at runtime instead.
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
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased">
        <div className="mx-auto w-full max-w-[420px]">{children}</div>
      </body>
    </html>
  );
}
