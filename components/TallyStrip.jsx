/*
 * TallyStrip
 *
 * The signature element of the redesign. Sixty marks, one per night, read
 * like a tally scratched on a hostel wall. It replaces the GitHub-style
 * contribution grid, which reads as a heatmap of activity rather than a
 * record of nights kept.
 *
 * Every mark encodes real state, nothing here is decorative:
 *   lit       shipped
 *   dark      the night went dark
 *   repaired  recovered with a shield
 *   now       tonight, still open, the only animated mark
 *   ahead     not reached yet
 *
 * The same component appears on all three routes at three sizes. One device,
 * three contexts, so a student learns to read it once.
 */

const HEIGHTS = {
  sm: { base: 8, lit: 14, dark: 5, repaired: 11, now: 22 },
  md: { base: 11, lit: 19, dark: 7, repaired: 15, now: 30 },
};

const COLORS = {
  lit: "var(--lamp)",
  dark: "var(--dark)",
  repaired: "var(--ship)",
  now: "var(--lamp)",
  ahead: "var(--lamp-dim)",
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
      {marks.map((mark, i) => {
        const height =
          mark === "now"
            ? h.now
            : mark === "lit"
              ? h.lit
              : mark === "dark"
                ? h.dark
                : mark === "repaired"
                  ? h.repaired
                  : h.base;

        return (
          <span
            key={i}
            aria-hidden="true"
            className={`block w-[3px] rounded-sm ${
              mark === "now" ? "animate-breathe" : ""
            }`}
            style={{
              height,
              background: COLORS[mark],
              opacity: mark === "ahead" ? 0.55 : 1,
            }}
          />
        );
      })}
    </div>
  );
}

/** Legend for the strip. Shown on the dashboard only, where the states matter. */
export function TallyKey() {
  const items = [
    ["lit", "var(--lamp)"],
    ["dark", "var(--dark)"],
    ["repaired", "var(--ship)"],
    ["ahead", "var(--lamp-dim)"],
  ];

  return (
    <ul className="mt-1 flex gap-3 font-mono text-[9.5px] tracking-wide text-muted-2">
      {items.map(([label, color]) => (
        <li key={label} className="flex items-center gap-1">
          <span
            aria-hidden="true"
            className="inline-block h-[6px] w-[6px] rounded-sm"
            style={{ background: color }}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}
