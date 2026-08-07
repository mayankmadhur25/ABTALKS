import TallyStrip, { TallyKey } from "@/components/TallyStrip";
import { getMarks, getStudent, getCohortMarks, SCENARIOS, getScenarioLabel } from "@/lib/data";

/*
 * Temporary component preview. Replaced by the real landing page in commit 4.
 * It exists so the tokens and the TallyStrip can be checked on a real device
 * before any screen is built on top of them.
 */
export default function TokenPreview() {
  return (
    <main className="px-5 py-12">
      <p className="eyebrow">Commit 3 · component preview</p>
      <h1 className="mt-3 font-display text-[32px] font-extrabold leading-none tracking-tight">
        Tokens and the Tally Strip
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Not the landing page. This is a working preview of the design system so
        it can be checked at 390px before the screens are built.
      </p>

      <section className="mt-9">
        <p className="eyebrow-quiet">Palette</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[
            ["ink", "var(--ink)"],
            ["surface", "var(--surface)"],
            ["line", "var(--line)"],
            ["paper", "var(--paper)"],
            ["lamp", "var(--lamp)"],
            ["lamp dim", "var(--lamp-dim)"],
            ["ship", "var(--ship)"],
            ["dark", "var(--dark)"],
          ].map(([name, value]) => (
            <div key={name}>
              <div
                className="h-11 rounded-lg border border-line"
                style={{ background: value }}
              />
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-2">
                {name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <p className="eyebrow-quiet">Type</p>
        <p className="mt-3 font-display text-2xl font-extrabold tracking-tight">
          Bricolage Grotesque
        </p>
        <p className="mt-1 text-[15px] text-muted">IBM Plex Sans for reading</p>
        <p className="mt-1 font-mono text-xs tracking-wide text-muted-2">
          IBM PLEX MONO 11 / 60 · 2H 46M
        </p>
      </section>

      <section className="mt-9">
        <p className="eyebrow-quiet">Tally strip, all four states</p>
        <div className="mt-3 space-y-4">
          {SCENARIOS.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {getScenarioLabel(key)}
              </p>
              <TallyStrip marks={getMarks(getStudent(key))} className="mt-2" />
            </div>
          ))}
        </div>
        <TallyKey />
      </section>

      <section className="mt-9">
        <p className="eyebrow-quiet">Small size, used on the day screen</p>
        <div className="mt-3 rounded-2xl border border-line bg-surface p-4">
          <TallyStrip marks={getCohortMarks()} size="sm" />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-2">
            Cohort 11 · day 41 · 3 dark · 1 repaired
          </p>
        </div>
      </section>

      <p className="mt-10 text-xs leading-relaxed text-muted-2">
        Sixty marks, one per night. Tonight is the only animated mark, and it is
        the only lit thing on the screen.
      </p>
    </main>
  );
}
