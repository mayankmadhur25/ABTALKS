import Link from "next/link";

/*
 * Shared bar for the two signed-in screens. Kept in one file so the dashboard
 * and the day screen can never drift apart, and so a change during the live
 * feature round touches one place.
 */
export default function AppBar({ back, title, right }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b-[1.5px] border-ink bg-paper px-5 py-3">
      {back ? (
        <Link
          href={back}
          className="flex items-center gap-2 font-display text-[14px] font-bold tracking-tight"
        >
          <span aria-hidden="true">&larr;</span>
          {title}
        </Link>
      ) : (
        <span className="font-display text-[15px] font-extrabold tracking-tight">
          AB<span className="text-blue">Talks</span>
        </span>
      )}
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}

/** Small labelled pill. Tone maps to the one job each colour has. */
export function Pill({ children, tone = "plain" }) {
  const tones = {
    plain: "bg-card text-ink",
    yellow: "bg-yellow text-ink",
    blue: "bg-blue text-white",
    pink: "bg-pink text-white",
    green: "bg-green text-white",
  };
  return (
    <span
      className={`rounded-full border-[1.5px] border-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
