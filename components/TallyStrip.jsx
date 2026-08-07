/*
 * TallyStrip
 *
 * The signature element. Sixty marks, one per night, read like a tally
 * scratched on a hostel wall. It replaces the GitHub-style contribution grid,
 * which shows activity volume. This challenge is not about volume, it is
 * about whether you kept the night.
 *
 * Every mark encodes real state, nothing is decorative:
 *   lit       shipped, blue
 *   dark      the night went dark, drawn as a short ink mark
 *   repaired  recovered with a shield, green
 *   now       tonight, pink, the only animated mark on the page
 *   ahead     not reached yet, pale
 *
 * The same component appears on all three routes at two sizes, so a student
 * learns to read it once.
 */

const HEIGHTS = {
  sm: { ahead: 8, lit: 15, dark: 6, repaired: 12, now: 24 },
  md: { ahead: 11, lit: 20, dark: 8, repaired: 16, now: 32 },
};

const COLORS = {
  lit: "var(--blue)",
  dark: "var(--ink)",
  repaired: "var(--green)",
  now: "var(--pink)",
  ahead: "var(--ahead)",
};

export default function TallyStrip({ marks, size = "md", className = "" }) {
  const h = HEIGHTS[size] ?? HEIGHTS.md;

  const counts = marks.reduce((acc, m) => {
    acc[m] = (acc[m] ?? 0) + 1;
    return acc;
  }, {});

  const summary = [
    counts.lit ? `${counts.lit} nights shipped` : null,
    counts.dark ? `${counts.dark} nights dark` : null,
    counts.repaired ? `${counts.repaired} nights repaired` : null,
    counts.now ? "tonight still open" : null,
    counts.ahead ? `${counts.ahead} nights ahead` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      role="img"
      aria-label={`Progress strip: ${summary}.`}
      className={`flex items-end gap-[2px] ${className}`}
      style={{ height: h.now + 4 }}
    >
      {marks.map((mark, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`block w-[3px] rounded-[1px] origin-bottom ${
            mark === "now" ? "animate-pop" : ""
          }`}
          style={{ height: h[mark] ?? h.ahead, background: COLORS[mark] }}
        />
      ))}
    </div>
  );
}

/** Legend. Shown on the dashboard only, where all five states can occur. */
export function TallyKey() {
  const items = [
    ["shipped", "var(--blue)"],
    ["tonight", "var(--pink)"],
    ["dark", "var(--ink)"],
    ["repaired", "var(--green)"],
  ];

  return (
    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9.5px] uppercase tracking-wider text-ink-faint">
      {items.map(([label, color]) => (
        <li key={label} className="flex items-center gap-1">
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[3px] rounded-[1px]"
            style={{ background: color }}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}
