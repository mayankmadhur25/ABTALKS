import "./globals.css";

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
 * Desktop, as the brief puts it, is a secondary consideration. Rather than
 * stretching a phone layout across 1400px, the column is presented as what it
 * is: a printed sheet, bordered and offset against a darker ground, with a
 * standing rail beside it. The mobile design is untouched below 1024px.
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

        <div className="lg:flex lg:items-start lg:justify-center lg:gap-12">
          {/* Standing rail. Desktop only, and deliberately not a second column
              of product: it explains the artifact rather than competing with it. */}
          <aside className="hidden lg:block lg:w-[260px] lg:shrink-0 lg:pt-2">
            <p className="font-display text-[20px] font-extrabold tracking-tight">
              AB<span className="text-blue">Talks</span>
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              Designed at 390px, for a student on a phone, late, after college.
              This is that screen at its real size.
            </p>

            <hr className="my-6 border-ink" />

            <p className="eyebrow-quiet">Route map</p>
            <ul className="mt-2.5 space-y-1 font-mono text-[12px]">
              <li>/</li>
              <li>/dashboard</li>
              <li>/day/12</li>
            </ul>

            <hr className="my-6 border-ink" />

            <p className="eyebrow-quiet">The idea</p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">
              The streak is a habit mechanic. The portfolio is the product.
              Sixty nights, sixty artifacts, one public record.
            </p>
          </aside>

          <div className="mx-auto w-full max-w-[420px] bg-paper lg:mx-0 lg:border-2 lg:border-ink lg:shadow-[8px_8px_0_var(--ink)]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
